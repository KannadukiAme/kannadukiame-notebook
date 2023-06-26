# OpenWrt

> 记录 OpenWrt 的安装与实践经验

## 前言

OpenWrt 是开源的基于 Linux 的路由器系统，除官方版本，还有其他社区或个人的定制版。如 koolshare 的 lede,Lean 的 OpenWrt(lede),Lienol 的 OpenWrt 等等...

这里推荐使用[Lean 的 OpenWrt(lede)](https://github.com/coolsnowwolf/lede)

截至到 2020 年 3 月 11 日，推荐使用[Lienol 的 OpenWrt](https://github.com/Lienol/openwrt)

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

### 修改 lan 口 IP

OpenWrt 的 lan 口默认地址为 192.168.1.1，需要根据实际情况修改该默认 IP

```bash
# 编辑lan口地址
vi /etc/config/network
```

也可以通过 web 后台管理界面直接修改 lan 口 IP

### DHCP 配置相关

```bash
# 向dhcp添加cname配置
uci add dhcp cname
uci set dhcp.@cname[-1].cname="ftp.example.com"
uci set dhcp.@cname[-1].target="www.example.com"
uci commit dhcp
/etc/init.d/dnsmasq restart
```

```bash
# 清除cname配置
uci delete dhcp.@cname[-1]
uci commit dhcp
/etc/init.d/dnsmasq restart
```

## 相关插件

### 主题美化

推荐使用 Argon 主题，[仓库地址](https://github.com/jerrykuku/luci-theme-argon)

该主题 1.7.0 版本支持自定义图片、视频，并且还有主题配置面板。

该主题的 ipk 可从仓库地址里的 release 版下载，一共有两个 ipk，另外一个是主题配置面板。

由于该主题使用了 backdrop-filter 属性，此属性在 firefox 下默认是关闭的。下面图中可以看到各浏览器对此属性的支持情况。

![backdrop-filter属性支持](/img/backdrop-filter.jpg)

因此 firefox 需要在 about:config 将 layout.css.backdrop-filter.enabled 的值置为 true

![firefox开启backdrop-filter支持](/img/firefox-aboutconfig.jpg)

在主题配置面板选好背景上传之后，如图所示。

![openwrt登录背景](/img/openwrt-bg.jpg)

## 参考链接

- [在 Virtualbox 虚拟机中运行 OpenWrt](https://openwrt.org/zh/docs/guide-user/virtualization/virtualbox-vm)
- [OpenWrt 构建系统安装](https://openwrt.org/docs/guide-developer/build-system/install-buildsystem)
- [OpenWrt 配置 dhcp](https://openwrt.org/docs/guide-user/base-system/dhcp_configuration)
