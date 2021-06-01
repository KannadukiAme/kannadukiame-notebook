# Arch

>　记录archlinux的安装与配置

## 安装前的准备工作

### 下载镜像与烧录

[下载镜像](https://www.archlinux.org/download/)

将下载好的镜像写入U盘

```bash
# arch.iso为下载镜像的名称,sdx根据设备名称自行替换
dd if=~/Downloads/arch.iso of=/dev/sdx bs=4M

# 写入完毕，查看分区情况，若有sdx1,sdx2则表明写入成功
lsblk
```

### 检查启动模式

输入以下命令，如果没有错误信息，就是UEFI模式，否则，就是BIOS(或CSM)模式。

```bash
ls /sys/firmware/efi/efivars
```

::: tip Note
如果是从虚拟机安装系统，建议开启UEFI模式，有些虚拟机软件可能需要手动设置
:::

### 检查系统时钟

使用timedatectl开启系统时钟加速

```bash
timedatectl set-ntp true
```

检查当前时间

```bash
timedatectl status
```

### 磁盘分区

下面列出UEFI/GPT分区方案，BIOS的分区方案自行在archwiki上查找

| device    | 挂载点        | 分区大小 | 分区类型 | 说明                     |
| --------- | ------------- | -------- | -------- | ------------------------ |
| /dev/sdx1 | /mnt/boot or /mnt/efi | 300-500M | fat32    | EFI系统分区 用于引导启动 |
| /dev/sdx2 | [SWAP] | >=512M | swap     | arch的swap               |
| /dev/sdx3 | /mnt          | 任意     | ext4     | arch安装分区             |

使用fdisk进行分区

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

## 安装

### 设置源

目前(2021-5-31)不需要手动设置，联网后，reflector会自动设置最快的20个镜像列表

### 安装基础包

```bash
pacstrap /mnt base linux linux-firmware
```

::: tip Note
从虚拟机或容器中安装，可跳过firmware的安装
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

安装dhcpcd

```
pacman -S dhcpcd
```

配置dhcp

```bash
# 启用dhcpcd服务
systemctl enable dhcpcd
dhcpcd
```

如需要可配置静态IP

```
# /etc/dhcpcd.conf

interface eth0
static ip_address=192.168.0.10/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8
```

### 安装grub启动器

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

### 设置root密码

```bash
passwd
```

### 添加用户

添加名为madoka的用户

```bash
useradd -m madoka
```

为madoka设置密码
```bash
passwd madoka
```

使用visudo加入到sudoers

```bash
visudo

# /etc/sudoers
madoka ALL=(ALL) ALL
```

### SSH

```bash
# 安装ssh
pacman -S openssh

# 编辑/etc/ssh/sshd_config
PermitRootLogin yes #允许远程root登陆

# 启用ssh服务
systemctl enable sshd
systemctl start sshd
```

## 参考链接

1. [arch安装向导](https://wiki.archlinux.org/index.php/Installation_guide)
2. [mirrors生成器](https://www.archlinux.org/mirrorlist/)
3. [GRUB](https://wiki.archlinux.org/index.php/GRUB)
