# MISAKI

**MISAKI** 是现役家用女仆，采用 `Proxmox VE` 虚拟化方案，为主人提供魔法上网、云存储、云媒体等服务。

## 硬件配置

- 4x Cores Intel Core i5-7300U
- 8GB RAM
- 128G SSD mSATA & 2T HDD
- 6x Ethernet ports
- 2x USB2 ports & 2x USB3 ports

## 在物理机上安装 Proxmox VE

参考[这里->](/notes/hypervisor/pve.md)

## 在虚拟机上安装 OpenWrt

这里使用 [immortalwrt](https://github.com/immortalwrt/immortalwrt) 的 OpenWrt 分支，下载 [qcow2 镜像](https://downloads.immortalwrt.org/)

1. **创建 OpenWrt 虚拟机**

CPU 分配 2 核心 HOST 类型，内存 1024MB 即可满足需求。这里需要网络取消勾选防火墙，移除自带硬盘。

2. **配置 OpenWrt 虚拟机**

添加 PCI 设备，将剩余 5 个以太网口全部直通给 OpenWrt 虚拟机

使用 `scp` 命令上传 qcow2 镜像

```bash
scp immortalwrt-23.05.1-x86-generic-generic-ext4-combined-efi.qcow2 root@192.168.2.3:/var/lib/vz/template/immortalwrt-23.05.1-x86-generic-generic-ext4-combined-efi.qcow2
```

进入 `/var/lib/vz/template` 目录，执行导入操作

```bash
qm importdisk 102 immortalwrt-23.05.1-x86-generic-generic-ext4-combined-efi.qcow2 local-lvm
```

回到硬件界面，编辑未使用的磁盘，设备类型改为 SATA

![图7](/img/misaki/7.jpg)

在选项处修改引导顺序，将 SATA 硬盘设置为第一优先级。

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

### 配置 Arch Linux

详细配置过程参考[这里->](/notes/linux/arch.md)

::: warning
root 账号密码为空，默认用户账号名与密码都是 arch。
记得及时修改 root 账号与默认用户的密码。  
:::

**设置静态 IP**

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

### 部署 Docker 容器

根据实际需要，目前可部署以下服务的 Docker 容器

- Portainer **Docker 容器在线管理**
- Nextcloud **私人云盘**
- Jellyfin **媒体播放**

#### 部署 Portainer 服务

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

#### 部署 Nextcloud 服务

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

#### 部署 Jellyfin 服务

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

- [Portainer 官网](https://www.portainer.io/)
- [Nextcloud 官网](https://nextcloud.com)
- [Jellyfin 官网](https://jellyfin.org/)
