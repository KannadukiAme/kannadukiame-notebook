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

::: warning 注意事项

网卡直通需要勾选全部功能，否则会有速率问题。

![](/img/misaki/8.jpg)

**这里要勾选全部功能！！！**
:::

使用 `scp` 命令上传 qcow2 镜像

```bash
scp immortalwrt-23.05.2-x86-64-generic-ext4-combined-efi.qcow2 root@192.168.2.3:/var/lib/vz/template/immortalwrt-23.05.2-x86-64-generic-ext4-combined-efi.qcow2
```

进入 `/var/lib/vz/template` 目录，执行导入操作

```bash
qm disk import 100 immortalwrt-23.05.2-x86-64-generic-ext4-combined-efi.qcow2 local-lvm
```

回到硬件界面，编辑未使用的磁盘，设备类型改为 SATA

![图7](/img/misaki/7.jpg)

在选项处修改引导顺序，将 SATA 硬盘设置为第一优先级。

### 必要插件预设

插件预设

- singbox 代理工具
- argon 主题

相关 luci 插件包名称， 包管理页面会自动安装相关依赖

- sing-box
- luci-theme-argon

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
qm disk import 100 archlinux.qcow2 local-lvm
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

根据实际需要，已部署的应用如下

- Dockge 可视化容器管理工具
- Alist 云盘
- Homepage 可定制仪表盘
- qBittorrent 资源下载
