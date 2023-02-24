# MISAKI(Proxmox VE) 调教日记

MISAKI 是主力家用女仆，专为家庭提供云盘存储、媒体等服务提供硬件支持。

## 硬件配置

- 4x Cores Intel Core i5-7300U
- 8GB RAM
- 128G SSD mSATA & 250GB SSD SATA
- 6x Ethernet ports
- 2x USB2 ports & 2x USB3 ports

## 安装 Proxmox VE

Proxmox VE 是开源的虚拟化管理平台，基于 Debian 系统，非常适合 All In One 方案。  
唯一遗憾的是免费版无法更新软件包，需要付费订阅。不过免费版也足够一般用户使用了。

安装过程十分简单，在 Proxmox VE 官网上下载 iso 镜像，烧录到 U 盘上即可。

开机启动时选择优先 U 盘启动，跟随安装指示就可以轻松完成。

安装过程中，需要设定 Web 管理端的 IP 地址，这里设置为 `192.168.2.3` 。

安装完毕后，进入 `https://192.168.2.3:8006` 就可以开始创建虚拟机了。

## 在虚拟机上安装 Arch Linux

这里选择使用 qcow2 镜像，比起 iso 镜像安装方式不知快了多少倍。好在 Archlinux 官网提供了 qcow2 镜像下载，可以节省不少时间。

1. **在 Proxmox VE 上创建虚拟机**

![图3](/img/misaki/3.jpg)

![图4](/img/misaki/4.jpg)

选择不使用任何介质，磁盘类型选 `VirtIO Block`，其余根据需要自行设置。

2. **上传 qcow2 镜像**

进入到事先下载好的 archlinux 镜像文件所在目录

使用 `scp` 命令上传 qcow2 镜像

```bash
scp archlinux.qcow2 root@192.168.2.3:/var/lib/vz/template/archlinux.qcow2
```

3. **导入 qcow2 镜像**

进入 `/var/lib/vz/template` 目录，执行导入操作

```bash
qm importdisk 100 archlinux.qcow2 local-lvm
```

4. **将转好的虚拟硬盘挂载到虚拟机上**

## 配置虚拟机

::: info
安装好以后，记得修改 root 账号与默认用户的密码。  
root 账号密码为空，默认用户账号名与密码都是 arch。
:::

### 设置静态 IP

修改 `/etc/systemd/network` 目录下的 `.network` 配置文件  
这里设置虚拟机的静态 IP 为 `192.168.2.4`

```
[Match]
Name=eth0
[Network]
Address=192.168.2.4/24
Gateway=192.168.2.1
```

重新加载配置

```bash
networkctl reload
```

### 安装 Docker

```bash
pacman -S docker docker-compose
```

开机自动加载 Docker 服务

```bash
systemctl enable docker
systemctl start docker
```

### 直通硬盘

查看需要直通硬盘的型号，也可以直接在 pve 的 web 管理界面上直接查找

```bash
ls /dev/disk/by-id/
```

![图5](/img/misaki/5.jpg)

然后执行以下命令

```bash
qm set 100 --sata0 /dev/disk/by-id/ata-Samsung_SSD_750_EVO_250GB_S32LNWAH636762K
```

100 为虚拟机 id，--sata0 指定硬盘类型和序号，/dev/disk/by-id/xxx 指定该硬盘

## 在虚拟机上部署 Docker 容器

根据实际需要，目前可部署以下服务的 Docker 容器

- Portainer **Docker 容器在线管理**
- Nextcloud **私人云盘**
- Jellyfin **媒体播放**

::: tip 读写 NTFS 分区
如果挂载的硬盘分区是 NTFS 类型，需要额外装 `ntfs-3g`

```bash
pacman -S ntfs-3g
```

挂载到 `/mnt/sda2` 目录下

```bash
mount /dev/sda2 /mnt/sda2
```

:::

### 部署 Portainer 服务

这里使用社区版 `portainer-ce`

docker-compose 配置模板如下

```yml
version: '3'
services:
  app:
    image: portainer/portainer-ce:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data
    ports:
      - 8000:8000
      # - 9000:9000 for use http
      - 9443:9443
```

容器内 `/data` 目录是 Portainer 服务存放数据库所在目录，`9000` 端口为 http 使用，`9443` 端口为 https 使用。

进入 `https://192.168.2.4:9443` 即可开始创建管理账号使用。

### 部署 Nextcloud 服务

直接使用 Dockerhub 上 Nextcloud 提供的 docker-compose 配置模板。为了方便备份和测试，没有使用 volume 管理。

::: info PS
不要使用官网的提供的那个 AIO Docker 镜像，默认是需要域名验证的，后续配置十分麻烦，架设在内网上的不需要那么多额外配置。  
当然如果是架设在公网上，并且有现成的域名，可以直接使用官方的 AIO Docker 镜像。
:::

```yml
version: '2'

services:
  db:
    image: mariadb:10.5
    restart: always
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=
      - MYSQL_PASSWORD=
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80
    links:
      - db
    volumes:
      - ./html:/var/www/html
      - /mnt/sda2:/downloads
    environment:
      - MYSQL_PASSWORD=
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
```

注意 app 的 `MYSQL_PASSWORD` 密码要与 db 的一致。

部署完毕后，进入 `http://192.168.2.4:8080` 继续完成剩下的安装。

---

此外，为了挂载外部存储 `/downloads`，需要安装插件 `External storage support`

![图1](/img/misaki/1.jpg)

找到 `External storage support` 插件，安装之后，在个人设置界面会多出一个外部存储的菜单。

![图2](/img/misaki/2.jpg)

### 部署 Jellyfin 服务

直接使用官方提供的 `docker-compose` 配置模板

```yml
version: '3.5'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    network_mode: 'host'
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/sda2:/media
    restart: 'unless-stopped'
    extra_hosts:
      - 'host.docker.internal:host-gateway'
```

`/mnt/sda2` 虚拟机挂载外部存储目录

部署完毕后，进入 `http://192.168.2.4:8096` 开始配置

## 参考链接

- [Proxmox VE 官网](https://www.proxmox.com/)
- [Portainer 官网](https://www.portainer.io/)
- [Nextcloud 官网](https://nextcloud.com)
- [Jellyfin 官网](https://jellyfin.org/)
