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

得益于 Debian 系的强大生态，还是 Jellyfin 官方支持的首选 Linux 平台。

安装过程非常简单，没有什么好说的。直接下载官网提供的脚本，一键安装即可。

```bash
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```

## 使用 Jellyfin

在使用之前，先准备好视频素材，如果在移动硬盘上，则需要将硬盘挂载到自定义目录下。

先用 `fdisk` 看看分区

```bash
fdisk -l
```

![图3](/img/sora/3.jpg)

可以看到 sda2 就是我们要挂载的设备名称，然后使用 `mount` 挂载到我们新建的文件夹下。

```bash
mount /dev/sda2 ./mine
```

回到浏览器上，进入 `http://192.168.2.2:8096` Jellyfin 的 web 界面里开始设置。  
添加完毕之后，Jellyfin 会开始初始化扫描，等待几分钟即可。

### 编码

常见的视频编码格式主要有 H.264(AVC),H.265(HEVC),VP9,AV1 这些在各大资源站以及压制组中也是使用比较多的。

客户端对主流视频格式的支持情况。

![图7](/img/sora/7.jpg)

可以看到在众编码格式中，H.264(8Bit)是支持最多的。

在浏览器当中，火狐和 Safari 基本处于垫底的，巨硬家的 Edge 几乎支持所有主流的编码格式，唯一美中不足的是 H.265 格式的需要到商店里下载插件，而这个插件竟然是收费的。
但无论怎么说，浏览器这块还是比不上原生的客户端。所以，PC 端还是得用 Jellyfin 的桌面端。苹果端有 SwiftFin 原生支持还是不错的，安卓端面对 H.265 就有点棘手了。

### 转码

如果客户端不支持某种视频编码格式，那么 Jellyfin 服务端就要对此进行转码操作，而这项工作我们的 SORA 是没办法胜任的（指 4 核心跑满 2 核心高额负载）。

面对这种情况，我所能给出的和解办法是...要么选择支持多种编码格式的客户端，要么尽量下载 H.264 编码格式的视频。

> - Direct Play: Delivers the file with no modifications. Almost no additional load on the server.
> - Remux: Changes the container but leaves both audio and video streams untouched.
> - Direct Stream: Transcodes audio but leaves original video untouched.
> - Transcode: Transcodes the video stream.

上面列出了有三种类型的转码，按照负载从小到大的顺序来看，视频转码是最大的。  
望向 SORA 孱弱的小身板(叹息)，视频转码这种事就不指望她了，只能干前两种最轻松的活。  
不过在 Jellyfin 里面似乎无法直接禁用转码的，只能在用户界面里禁止直接播放需要转码的视频及音频。

![图4](/img/sora/4.jpg)

![图5](/img/sora/5.jpg)

![图6](/img/sora/6.jpg)

取消勾选的两个选项即可。

### 分类

按媒体类型分类

以搜集整理纸片人动画为例

TV 动画与剧场版

视频元信息抓取

### 结论

ARMv8 架构的 CPU 就不要转码了，这不是(~~贫乳萝莉~~)袖珍开发板该干的活！就算上了硬件加速也是白搭，更何况 FFmpeg 这块还没有跟上。  
老老实实交给客户端解码就好了。

不过总的来说，除了老生常谈的内存泄露问题，Jellyfin 作为开源的跨平台媒体服务还是非常好用的。

::: info PS
如果忘记管理密码或者是紧急情况，可以尝试以下办法

找到 `/etc/jellyfin/system.xml` 文件编辑以下内容，重新进入 web 界面即可重置管理密码。

```xml

<IsStartupWizardCompleted>true</IsStartupWizardCompleted> // [!code --]
<IsStartupWizardCompleted>false</IsStartupWizardCompleted> // [!code ++]
```

~~这其实也算是一个后门了，前提是拿到 root 权限的话...~~

~~不过 root 权限都被拿了，那也没什么好说了...~~
:::

## 参考链接

- [Raspberry Pi 3 Model B 产品详情](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/)
- [Debian 官网 wiki 配置网络](https://wiki.debian.org/NetworkConfiguration)
- [Jellyfin 官网](https://jellyfin.org/)
