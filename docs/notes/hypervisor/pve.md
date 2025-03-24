# Proxmox VE

基于 Debian Linux 的高性能虚拟机解决方案，提供 Web UI 或 CLI 管理方式

::: warning
以下所有安装与使用方法基于 **Proxmox VE 8.1.3** 版本上实践，不保证其他版本操作方法一致
:::

## 安装

使用官方提供的[镜像](https://www.proxmox.com/en/downloads)，linux 下直接使用 dd 命令烧录到 u 盘即可，windows 下推荐使用 rufus 工具。

安装后，默认 web 页面管理地址为 `https://localhost:8006`

## 订阅与系统更新

### 在 PVE 界面上修改默认订阅源

节点 -> 更新 -> 存储库

添加 `No-Subscription Repository` 订阅源

![](/img/hypervisor/pve-no-subscription-repository.jpg)

禁用 `Enterprise Repository` `Ceph Quincy Enterprise Repository` 订阅源

![](/img/hypervisor/pve-disable-subscription-repository.jpg)

### 系统更新

```bash
apt-get update
apt-get dist-upgrade
```

查看是否更新成功

```bash
pveversion -v
```

## 硬件直通

硬件直通需要开启 IOMMU

::: info 前置条件
Intel 的 CPU 需在主板 BIOS 开启 `VT-d`
:::

编辑 `/etc/default/grub`

添加 `intel_iommu=on` 到 `GRUB_CMDLINE_LINUX_DEFAULT=”quiet”`

```text
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet" // [!code --]
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on" // [!code ++]
GRUB_CMDLINE_LINUX=""
```

保存并更新 grub

```bash
update-grub
```

重启即可生效

### 在 PVE 上挂载 ntfs 分区

::: tip
linux 内核版本 >= 5.15 均支持 `ntfs3`
:::

使用 `ntfs3` 挂载 ntfs 分区

```bash
mount -t ntfs3 /dev/sda2 /mnt/download
```

若挂载失败出现如下问题时，可尝试使用 `ntfsfix` 修复

```
mount: /mnt: wrong fs type, bad option, bad superblock on /dev/sda2, missing codepage or helper program, or other error.
       dmesg(1) may have more information after failed mount system call.
```

```
sda2: volume is dirty and "force" flag is not set!
```

修复标记为 dirty 的 ntfs 分区

```bash
ntfsfix --clear-dirty /dev/sda2
```

::: info PS
使用 `ntfsfix` 需安装 `ntfs-3g` 包
:::

### LXC 硬盘直通

将宿主的 sda1 硬盘分区直通给 id 为 100 的 lxc 容器，挂载路径为 `/data`

```bash
pct set 100 -mp0 /dev/sda1,mp=/data
```

::: warning 注意事项
宿主硬盘目录里的资源映射到非特权容器时，用户权限会发生偏移，需要在宿主机进行修正

例如，容器里 `root` 用户在宿主机表示为 `100000`

```bash
chown -R 100000:100000 /data
```

:::

### 虚拟机硬盘直通

查看需要直通硬盘的型号，也可以直接在 pve 的 web 管理界面上直接查找

```bash
ls /dev/disk/by-id/
```

将宿主的硬盘直通给 id 为 101 的虚拟机，使用 sata 接口

```bash
qm set 101 --sata0 /dev/disk/by-id/ata-WDC_WD20SPZX-08UA7_WD-WXL1EC8FYULY
```

## LXC 使用

> LXC is a userspace interface for the Linux kernel containment features. Through a powerful API and simple tools, it lets Linux users easily create and manage system or application containers.

### 创建 LXC

![](/img/hypervisor/pve-1.jpg)

如图点击模板按钮，可以看到选择页面。

![](/img/hypervisor/pve-2.jpg)

选择任意镜像下载即可。

点击主界面右上角的创建 CT，根据步骤按需完成设置。

![](/img/hypervisor/pve-3.jpg)

![](/img/hypervisor/pve-4.jpg)

![](/img/hypervisor/pve-5.jpg)

![](/img/hypervisor/pve-6.jpg)

![](/img/hypervisor/pve-7.jpg)

![](/img/hypervisor/pve-8.jpg)

![](/img/hypervisor/pve-9.jpg)

## 自动挂载硬盘

使用 `blkid` 命令查看硬盘 `uuid`

```bash
blkid
```

配置 `/etc/fstab`

```
# <file system> <mount point> <type> <options> <dump> <pass>
UUID=xxx /xxx ext4 rw,noatime,nofail,x-systemd.device-timeout=3,errors=remount-ro 0 2 // [!code ++]
```

## 参考链接

- [Proxmox VE 官网](https://www.proxmox.com/)
- [Proxmox VE Administration Guide](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)
- [PVE PCI Passthrough](https://pve.proxmox.com/wiki/PCI_Passthrough)
- [Linux Container](https://linuxcontainers.org/)
