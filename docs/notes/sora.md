# SORA(Raspberry Pi 3 Model B) 调教日记

SORA 是简易家用女仆，致力于为各种稀奇古怪 Web 服务提供实战演练场地。体积娇小，功耗极低，价格便宜，是不可多得的全能萝莉型女仆(~~来自主人的好评~~)。

## 硬件配置

树莓派官网上给出的完整清单如下:

> - Quad Core 1.2GHz Broadcom BCM2837 64bit CPU
> - 1GB RAM
> - BCM43438 wireless LAN and Bluetooth Low Energy (BLE) on board
> - 100 Base Ethernet
> - 40-pin extended GPIO
> - 4 USB 2 ports
> - 4 Pole stereo output and composite video port
> - Full size HDMI
> - CSI camera port for connecting a Raspberry Pi camera
> - DSI display port for connecting a Raspberry Pi touchscreen display
> - Micro SD port for loading your operating system and storing data
> - Upgraded switched Micro USB power source up to 2.5A

4 核心的 1.2GHz 博通 64 位 CPU(ARM Cortex A53 ARMv8 架构)，1GB 内存，无线网卡带蓝牙，100M 有线网卡，4 个 USB2.0 接口，HDMI，SD 卡，2.5A 的 MicroUSB 电源。

## 安装 Raspberry Pi OS 系统

这里强烈建议使用树莓派官方提供的镜像烧录工具 [Raspberry Pi Imager](https://www.raspberrypi.com/software/)

我们选择 Raspberry Pi OS Lite(64-bit)，没有桌面环境体积小，非常适合做(~~女仆~~)服务器使用。

::: tip
在高级设置里面还可以设置主机名、账户密码、SSH 服务、WIFI 等设置，安装完毕可以直接接电源远程 SSH 登录使用，非常方便。
:::

![图片1](/img/sora/1.jpg)

## 礼仪

作为一个女仆，首先最重要的就是问候。每当主人使用 SSH 远程登录的时候，必须要规规矩矩地向主人问候才行。

找到用户目录下的 `.bashrc` 脚本，加入以下命令，就可以让女仆迎接我们了，是不是很简单呢。

```bash
echo "ご主人様お帰りなさい～ご飯にする？お風呂にする？それとも私？"
```

## 配置

在配置之前，记得先给 root 账号设置密码!

::: warning
Raspberry Pi OS 系统 root 账号初始是没有密码的。你也不想谁都可以随意搞你家的女仆吧!
:::

使用 `passwd` 给 root 账号设定好密码。

```bash
sudo passwd root
```

为了以后管理方便，我们还需要让女仆的房间住址固定下来，即 IP 地址，路由器管家默认会分配内网的动态 IP 地址，即 DHCP 协议。

下面来看看在 Debian 系下如何配置固定 IP 地址。

Debian 官方 wiki 说有三种办法可以做这件事情。但我们只需要一种最简单的就可以了。

在 `/etc/network/interfaces` 配置文件下做点修改就 OK。

```
auto eth0
iface eth0 inet static
    address 192.168.2.2/24
    gateway 192.168.2.1
```

根据当前网络状况，设置 eth0 接口为本机静态 IP 以及当前默认网关的 IP 即可。

修改前，记得用 ifconfig 命令确认要修改的接口名称。

![图片2](/img/sora/2.jpg)

修改完成后，重启 networking 服务。

```bash
systemctl restart networking
```

## 安装 Jellyfin

## 参考链接

- [Raspberry Pi 3 Model B 产品详情](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/)
- [Debian 官网 wiki 配置网络](https://wiki.debian.org/NetworkConfiguration)
