# OpenWrt

> 记录 OpenWrt 的安装与实践经验

## 前言

OpenWrt 是开源的基于 Linux 的路由器系统，除官方版本，还有其他社区或个人的定制版。

推荐使用 ImmortalWrt，安装与配置均以此版本为例。

最近更新版本 `OpenWrt 24.10`

**官方版**

- [openwrt](https://github.com/openwrt/openwrt)

**社区版**

- [lede](https://github.com/coolsnowwolf/lede)
- [Lienol's OpenWrt](https://github.com/Lienol/openwrt)
- [ImmortalWrt](https://github.com/immortalwrt/immortalwrt)

## 安装 OpenWrt 系统

在安装 OpenWrt 系统之前，需要准备 OpenWrt 的固件，有两种方法可以获取，一种是直接从官方或者第三方社区下载已经编译好的固件，另一种是自己下载 OpenWrt 的源码进行编译固件。

这里以 OpenWrt 的[官方版](https://openwrt.org/)为例，其他定制版的操作流程基本相同。

### 准备编译环境

不同 Linux 系统下的需要的编译环境不同，推荐在 Ubuntu 系统中编译，其他定制版都是推荐在该系统下编译，也可以使用 docker 容器进行编译。

::: warning 注意
各个定制版的 OpenWrt 系统在相同 Linux 系统下的所需要的编译环境也是不同的，需要到相应 git 仓库阅读 README 文档。
:::

- Ubuntu 18.04 LTS

```bash
sudo apt-get install subversion build-essential libncurses5-dev zlib1g-dev gawk git ccache gettext libssl-dev xsltproc zip
```

- Arch Linux

```bash
pacman -S --needed asciidoc bash bc binutils bzip2 fastjar flex git gcc util-linux gawk intltool zlib make cdrkit ncurses openssl patch perl-extutils-makemaker rsync unzip wget gettext libxslt boost libusb bin86 sharutils b43-fwcutter findutils time
```

其他 Linux 系统参考[这里](https://openwrt.org/docs/guide-developer/build-system/install-buildsystem)

### 编译固件

```bash
# clone源代码
git clone https://github.com/openwrt/openwrt.git

# 切换分支
git checkout openwrt-18.06

# 更新package
./scripts/feeds update -a

# 安装package
./scripts/feeds install -a

# 选择编译的硬件架构及模块
make menuconfig

# 开始编译(第一次编译推荐单线程)
make -j1 V=s
```

::: tip Note
如果是在 VirtualBox,VMWare 虚拟机中安装，则可以勾选编译选项中的 vmdk 或 vdi 输出选项。
:::

编译好的固件放在 bin 目录下。

### 开始安装

使用自己编译好的固件或者是在[snapshots/targets/x86/64/](https://downloads.openwrt.org/snapshots/targets/x86/64/)处下载镜像

解压缩后，拿到 squashfs 文件格式的 img 镜像，写入到 U 盘作为启动盘即可。

#### 写入到 tf 卡

```bash
# img镜像512字节对齐
dd if=openwrt-x86-64-combined-squashfs.img of=/dev/sdx bs=512 conv=sync
```

#### img 镜像转换为 vdi/vmdk 虚拟介质

如果是在 VirtualBox,VMWare 虚拟机中安装，则需要将 img 镜像转换为 vdi,vmdk 等虚拟介质，一般编译固件会直接输出 vmdk 或 vdi 直接使用。

通过 VirtualBox 的命令行的工具可以转换 img 镜像为 vdi 或 vmdk 虚拟介质。

```bash
# img镜像转换为vdi
VBoxManage convertfromraw --format VDI lede-x86-64-combined-squashfs.img lede-x86-64-combined-squashfs.vdi
```

::: warning 注意事项
VirtualBox 需要 img 镜像 512 字节对齐,需要先将 img 镜像进行字节对其后，再进行转换
:::

## 配置 OpenWrt 系统

首次进入系统，必要的配置如下

### 修改 lan 口 IP

OpenWrt 的 lan 口默认地址为 192.168.1.1，需要根据实际情况修改该默认 IP

编辑 `/etc/config/network`

修改高亮处的 IP 地址即可

```text
config interface 'lan'
        option device 'br-lan'
        option proto 'static'
        option ipaddr '192.168.1.1'  // [!code highlight]
        option netmask '255.255.255.0'
        option ip6assign '60'
```

也可以通过 web 后台管理界面直接修改 lan 口 IP

### 系统扩容

默认 openwrt 镜像分配的初始空间较少，此时需要扩容

假设要扩容的存储设备是 `/dev/sda`

通常会包含以下两个分区

- `/dev/sda1` GRUB 和内核所在分区
- `/dev/sda2` root 文件系统所在分区 (通常有两种类型的分区 squashfs 和 ext4)

1. 扩展 root 分区

使用 `parted` 分区工具对 `/dev/sda` 进行扩容

```bash
# Install packages
opkg update
opkg install parted

# Identify disk name and partition number
parted -l -s

# Expand root partition
parted -f -s /dev/sda resizepart 2 100%

# Apply changes
reboot
```

2. 扩展 root 文件系统

使用 `losetup` 映射 `/dev/loop0` 到 `/dev/sda2` 并用 `resize2fs` 扩展 `/dev/loop0`

```bash
# Install packages
opkg update
opkg install losetup resize2fs

# Map loop device to root partition
losetup /dev/loop0 /dev/sda2 2> /dev/null

# Expand root filesystem
resize2fs -f /dev/loop0

# Apply changes
reboot
```

### 自定义域名映射

dnsmasq 可以自定义域名映射，但需要设置 DNS 重定向

![图4](/img/openwrt/4.jpg)

例如将 `example.local` 及其子域名的 IP 地址指定为 192.168.1.2

```
/example.local/192.168.1.2
```

### 关闭 IPv6

::: tip
如果没有 IPv6 公网地址，最好直接关闭 IPv6
:::

1. 删除 wan6 接口

![图1](/img/openwrt/1.jpg)

2. 接口 lan -> DHCP 服务 -> IPv6 服务

`RA 服务` `DHCPv6 服务` `NDP 代理` 设置已禁用

![图2](/img/openwrt/2.jpg)

3. 勾选 `过滤IPv6 AAAA记录`

![图3](/img/openwrt/3.jpg)

保存所有操作，重启生效。

### 配置 IPv6

等待实践...

## 参考链接

- [在 Virtualbox 虚拟机中运行 OpenWrt](https://openwrt.org/zh/docs/guide-user/virtualization/virtualbox-vm)
- [OpenWrt 构建系统安装](https://openwrt.org/docs/guide-developer/build-system/install-buildsystem)
- [Expanding root partition and filesystem](https://openwrt.org/docs/guide-user/installation/openwrt_x86#expanding_root_partition_and_filesystem)
