# Arch Linux

基于 Linux 系统的轻量级发行版，拥有强大的社区支持。

## 安装

archlinux 的安装过程极为繁琐，基本上每一步都需要自己来操作。初次安装，想要成功需得折腾个把小时，甚至几天才能搞定。不过可以学习到很多关于 Linux 系统的细节。

::: tip 快速安装
如果想要跳过繁琐的安装过程，可以使用镜像提供的快速安装工具 `archinstall`
:::

### 下载镜像与烧录

在 archlinux 官网上下载[镜像](https://www.archlinux.org/download/)

将下载好的镜像写入 U 盘

```bash
# arch.iso为下载镜像的名称,sdx根据设备名称自行替换
dd if=~/Downloads/arch.iso of=/dev/sdx bs=4M

# 写入完毕，查看分区情况，若有sdx1,sdx2则表明写入成功
lsblk
```

### 检查启动模式

输入以下命令，如果没有错误信息，就是 UEFI 模式，否则，就是 BIOS(或 CSM)模式。

```bash
ls /sys/firmware/efi/efivars
```

::: tip Note
如果是从虚拟机安装系统，建议开启 UEFI 模式，有些虚拟机软件可能需要手动设置
:::

### 检查系统时钟

使用 timedatectl 开启系统时钟加速

```bash
timedatectl set-ntp true
```

检查当前时间

```bash
timedatectl status
```

### 磁盘分区

下面列出 UEFI/GPT 分区方案，BIOS 的分区方案自行在 archwiki 上查找

| device    | 挂载点                | 分区大小 | 分区类型 | 说明                      |
| --------- | --------------------- | -------- | -------- | ------------------------- |
| /dev/sdx1 | /mnt/boot or /mnt/efi | 300-500M | fat32    | EFI 系统分区 用于引导启动 |
| /dev/sdx2 | [SWAP]                | >=512M   | swap     | arch 的 swap              |
| /dev/sdx3 | /mnt                  | 任意     | ext4     | arch 安装分区             |

使用 fdisk 进行分区

```bash
fdisk /dev/sdx

g # 创建gpt分区表
n # 创建新分区
t # 改变分区类型

w # 提交操作
```

分区后，进行格式化及挂载

```bash
# 格式化为ext4格式
mkfs.ext4 /dev/sdx3

# 格式化为fat32格式
mkfs.fat -F32 /dev/sdx1

# 挂载
mount /dev/sdx3 /mnt
mkidr /mnt/efi
mount /dev/sdx1 /mnt/efi

# 制作swap分区
mkswap /dev/sdX2
swapon /dev/sdX2
```

### 设置源

目前(2021-5-31)不需要手动设置，联网后，reflector 会自动设置最快的 20 个镜像列表

### 安装基础包

```bash
pacstrap /mnt base linux linux-firmware
```

::: tip Note
从虚拟机或容器中安装，可跳过 firmware 的安装
:::

### fstab

```bash
# 生成fstab配置
genfstab -U /mnt >> /mnt/etc/fstab
```

### 时区与语言设置

以下的操作需进入安装的系统

```
# 进入/mnt里安装的系统
arch-chroot /mnt
```

```bash
# 设置时区
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc

# 编辑/etc/locale.gen 找到 en_US.UTF-8 UTF-8 一行以及其他需要的locale去掉注释

# 生成locale
locale-gen

# 配置语言
# /etc/locale.conf
LANG=en_US.UTF-8
```

### 网络配置

编辑以下文件

```bash
# /etc/hostname
myhostname

# /etc/hosts
127.0.0.1	localhost
::1		localhost
127.0.1.1	myhostname.localdomain	myhostname
```

默认内置 `networkctl`

DHCP 配置模板

```
[Match]
Name=en*
[Network]
DHCP=yes
```

静态 IP 配置模板

```
[Match]
Name=enp2s0
[Network]
Address=192.168.0.15/24
Gateway=192.168.0.1
```

安装 dhcpcd

```
pacman -S dhcpcd
```

配置 dhcp

```bash
# 启用dhcpcd服务
systemctl enable dhcpcd
dhcpcd
```

如需要可配置静态 IP

```
# /etc/dhcpcd.conf

interface eth0
static ip_address=192.168.0.10/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8
```

### 安装 grub 启动器

UEFI

```bash
# 安装grub
pacman -S grub efibootmgr

# 指定efi安装路径
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB

# 生成grub配置文件
grub-mkconfig -o /boot/grub/grub.cfg
```

### 安装其他包

```bash
pacman -S base-devel linux-headers linux-lts
```

### 更新系统

```bash
# 初始化密钥
pacman-key --init
# 获取密钥
pacman-key --populate

# 更新密钥
pacman -Sy archlinux-keyring

# 更新系统
pacman -Syu
```

### 设置 root 密码

```bash
passwd
```

### 添加用户

添加名为 madoka 的用户

```bash
useradd -m madoka
```

为 madoka 设置密码

```bash
passwd madoka
```

使用 visudo 加入到 sudoers

```bash
visudo

# /etc/sudoers
madoka ALL=(ALL) ALL
```

## 配置环境

### SSH

安装 `openssh` 包

```bash
pacman -S openssh
```

::: info PS

如果需要在远程登录 root 账户

编辑 `/etc/ssh/sshd_config` 配置文件

```ssh-config
#PermitRootLogin prohibit-password // [!code --]
PermitRootLogin yes // [!code ++]
```

:::

开机自动加载 sshd 服务

```bash
systemctl enable sshd
systemctl start sshd
```

### Docker

安装 `docker` `docker-compose` 包

```bash
pacman -S docker docker-compose
```

开机自动加载 Docker 服务

```bash
systemctl enable docker
systemctl start docker
```

### 挂载 ntfs 分区

安装 `ntfs-3g` 包

```bash
pacman -S ntfs-3g
```

假设 sda2 分区为 ntfs 格式，使用 `ntfs-3g` 挂载 sda2 分区

```bash
ntfs-3g /dev/sda2 /mnt/ntfs
```

在挂载 ntfs 分区时，如果遇到以下问题

![](/img/misaki/6.jpg)

输入以下命令修复 ntfs 分区即可

```bash
ntfsfix /dev/sda2
```

### AUR

使用 `yay` 命令来安装 AUR 所维护的工具包，用法与 `pacman` 相似

```bash
yay -S xxx
```

从 git 仓库上构建 `yay` 包

```bash
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### Mirrors

`reflector` 可以按照指定筛选条件将镜像列表生成到 `/etc/pacman.d/mirrorlist`

安装 `reflector` 包

```bash
pacman -S reflector
```

常用例

按下载速度排序指定国家的镜像列表

```bash
reflector --country COUNTRY --sort rate --save /etc/pacman.d/mirrorlist
```

按下载速度排序最近同步的 200 个 HTTP 或 HTTPS 镜像

```bash
reflector --latest 200 --protocol http,https --sort rate --save /etc/pacman.d/mirrorlist
```

## 参考链接

- [archlinux 安装向导](https://wiki.archlinux.org/index.php/Installation_guide)
- [archinstall](https://wiki.archlinux.org/title/Archinstall)
- [GRUB](https://wiki.archlinux.org/index.php/GRUB)
- [mirrors 生成器](https://www.archlinux.org/mirrorlist/)
- [yay](https://github.com/Jguer/yay)
- [reflector examples](https://man.archlinux.org/man/reflector.1#EXAMPLES)
