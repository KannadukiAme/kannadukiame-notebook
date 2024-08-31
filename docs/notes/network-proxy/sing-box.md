# sing-box

> The universal proxy platform.

## 在 openwrt 下配置 tun 模式透明网关代理

::: info 相关软件信息

- ImmortalWrt 23.05.3
- sing-box version 1.10.0-beta.5

:::

### 安装

在 openwrt 中安装 sing-box，主要有两种方式，方式一可以直接体验最新版本，方式二可以享受 opkg 软件包管理带来的便利。

**方式一**

从[git 仓库](https://github.com/SagerNet/sing-box)中直接下载已编译好的二进制版

在 assets 中找到对应平台的已编译好的压缩包`sing-box-1.10.0-beta.5-linux-amd64v3.tar.gz`，下载好直接上传到 openwrt 中，使用`tar`命令([相关用法看这里](/notes/linux/command#tar))解压到指定目录即可。

::: info 前置条件
在 sing-box 配置 tun 模式之前还需要安装以下依赖，参考方式二直接从 opkg 软件包分别安装即可

- kmod-inet-diag
- kmod-netlink-diag
- kmod-tun

:::

**方式二**

从 opkg 软件包中安装

系统 -> 软件包 -> 更新列表

找到 `sing-box` 软件包点击安装，Luci 会自动安装相关依赖

### 配置

这里使用 tun 模式 + realip 的方案

tun 模式配置如下

```json
{
  "inbounds": [
    {
      "type": "tun",
      "address": "172.18.0.1/30",
      "mtu": 9000,
      "auto_route": true,
      "strict_route": true,
      "sniff": true,
      "endpoint_independent_nat": false,
      "stack": "system",
      "platform": {
        "http_proxy": {
          "enabled": true,
          "server": "127.0.0.1",
          "server_port": 2080
        }
      }
    },
    {
      "type": "mixed",
      "listen": "127.0.0.1",
      "listen_port": 2080,
      "sniff": true,
      "users": []
    }
  ]
}
```

开启 `Clash API` 支持

```json
{
  "experimental": {
    "clash_api": {
      "external_controller": "0.0.0.0:9090",
      "external_ui": "ui",
      "secret": "",
      "external_ui_download_url": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/Yacd-meta/archive/gh-pages.zip",
      "external_ui_download_detour": "direct",
      "default_mode": "rule"
    },
    "cache_file": {
      "enabled": true,
      "store_fakeip": false
    }
  }
}
```

其余配置请参考官方文档自行完成，或者找订阅转换网站直接生成

### 运行

指定配置文件 `config.json` 使用后台方式运行 sing-box

```bash
sing-box -c config.json run &
```

面板管理节点入口地址 `http://x.x.x.x:9090/ui`

最后在 luci 界面上添加 tun 接口即可

网络 -> 接口 -> 添加新接口

名称随意填写，选择不配置协议，设备指定为 sing-box 生成的 tun 网口

![](/img/sing-box/1.jpg)

编辑接口 -> 防火墙设置

![](/img/sing-box/2.jpg)

重启 openwrt 以使配置生效

### 订阅转换

对于 sing-box 的订阅请使用在线订阅转换 https://github.com/Toperlock/sing-box-subscribe

### 设置开机启动

编辑简易的 procd 脚本 `/etc/init.d/sing-box`

```sh
#!/bin/sh /etc/rc.common
USE_PROCD=1
START=95
STOP=01

SINGBOX_DIR="/root/sing-box/sing-box-1.10.0-alpha.20-linux-amd64"
SINGBOX_BIN="$SINGBOX_DIR/sing-box"
SINGBOX_CONFIG="$SINGBOX_DIR/config.json"

start_service() {
    procd_open_instance
    procd_set_param command $SINGBOX_BIN -c $SINGBOX_CONFIG -D $SINGBOX_DIR run
    procd_set_param stdout 1
    procd_set_param stderr 1
    procd_close_instance
}
```

给执行权限

```sh
chmod +x /etc/init.d/sing-box
```

启用服务

```sh
/etc/init.d/sing-box enable
```

查看是否启用成功

```sh
ls -la /etc/rc.d/S*
```

出现 `sing-box` 字样就是启用成功

```
/etc/rc.d/S95sing-box -> ../init.d/sing-box
```

开启服务

```sh
/etc/init.d/sing-box start
```

此时重启 openwrt 即可实现开机启动 sing-box

### 设置定时更新订阅任务

待续...

## 分流规则

原则上特殊规则写前面，泛用规则写最后。

sing-box 的规则集数据可以从[这里](https://github.com/MetaCubeX/meta-rules-dat/tree/sing)获取

### 需求

按照规则优先级排序

1. 屏蔽广告

geosite-category-ads-all => block

2. steam 下载走直连

geosite-steam@cn | domain:steamserver.net => direct

参考自[这里](https://github.com/2dust/v2rayN/issues/1361#issuecomment-1856192253)

3. DMM 走日本代理

geosite-dmm => Japan

4. Baha 走台湾代理

geosite-bahamut => Taiwan

5. 国内 IP 及网站走直连

geoip-cn | geosite-cn => direct

6. 国外网站走代理

final => Proxy

## 参考链接

- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
- [sing-box-example](https://github.com/malikshi/sing-box-examples)
- [Create a sample procd init script](https://openwrt.org/docs/guide-developer/procd-init-script-example)
