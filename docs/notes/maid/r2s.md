# R2S

来自官网维基的介绍

> - NanoPi R2S（以下简称 R2S）是友善电子团队最新推出的一款实现满速率双千兆的、完全开源的开发板。
> - NanoPi R2S 使用 RK3328 CPU，有两个千兆网络，1G DDR4 内存，友善电子团队为 NanoPi R2S 专门移植了 OpenWrt 系统，支持 Docker CE, 完全开源，用于企业物联网二次开发，个人定制 NAS 等。

## 硬件配置

```
CPU: Rockchip RK3328, Quad-core Cortex-A53
DDR4 RAM: 1GB
10/100/1000M 以太网口 x 1
USB3.0 转 10/100/1000M 以太网口 x 1
USB2.0 Host: Type-A x1
MicroSD Slot x 1
MicroUSB: 供电和 Slave 功能
Debug Serial Port: 3.3V TTL 电平，3Pin 2.54mm 间距排针
LED: LED x 3
KEY: KEY x 1 用户自定义功能
PC Size: 55.6 x 52mm
Power Supply: DC 5V/2A
Temperature measuring range: 0℃ to 80℃
OS/Software: U-boot，Ubuntu-Core，OpenWrt
```

## 服役纪录

2020 年 3 月 ~ 2024 年 7 月

## 散热

三月某日，全裸的 R2S 温度竟然高达 60°，这到夏天怕是撑不住，遂斥巨资购买一个 USB 风扇。

![](/img/r2s/1.jpg)

降温效果立竿见影，温度稳定在 35° 左右。风扇声音很小，不影响夜间睡眠，甚好。

![](/img/r2s/2.jpg)

忽然想整个风扇的温控脚本，但发现网上的解决办法都无效，遂作罢。

## 参考链接

- [NanoPi R2S/zh](https://wiki.friendlyelec.com/wiki/index.php/NanoPi_R2S/zh)
