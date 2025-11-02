# sing-box

> The universal proxy platform.

## 安装

在 openwrt 中安装有以下两种方式，其他 Linux 发行版下的安装也可参考。推荐用第二种方式安装。

**1. 从 git 仓库中的二进制可执行文件安装**

[SagerNet/sing-box](https://github.com/SagerNet/sing-box) 从官方仓库地址进入 release 页面

x86 架构 64 位 openwrt 系统直接下载这个 `sing-box-1.12.12-linux-amd64.tar.gz`，解压到任意目录即可

直接在当前目录下执行即可

```bash
sing-box -c config.json run
```

**2. 从 opkg 包管理中安装**

```bash
opkg install sing-box
```

或者 在 luci 界面直接安装

```bash
# 启用服务并保存
uci set sing-box.main.enabled='1'
uci commit

# sing-box 启动！
service sing-box start
```

## 代理模式

### 使用 TUN 模式作为透明网关代理

::: info 前置条件
在 sing-box 配置 tun 模式之前还需要安装以下依赖，如果是在 Luci 中安装会自动安装以下依赖。

- kmod-inet-diag
- kmod-netlink-diag
- kmod-tun

:::

入站配置如下

```json
{
  "inbounds": [
    {
      "tag": "tun-in",
      "type": "tun",
      "address": ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
      "mtu": 9000,
      "auto_route": true,
      "auto_redirect": true,
      "strict_route": true,
      "stack": "system"
    }
  ]
}
```

其他相关配置

```json
{
  "router": {
    "rules": [
      {
        "inbound": "tun-in",
        "action": "sniff"
      }
    ]
  }
}
```

启动 sing-box 之后，要在 luci 界面上添加 tun 接口

网络 -> 接口 -> 添加新接口

名称随意填写，选择不配置协议，设备指定为 sing-box 生成的 tun 网口

![](/img/sing-box/1.jpg)

编辑接口 -> 防火墙设置

![](/img/sing-box/2.jpg)

重启 openwrt 以使配置生效

### 使用 TPROXY 模式作为透明网关代理

::: info 前置条件
tproxy 模式需安装以下依赖

- kmod-tun

:::

入站配置如下

```json
{
  "inbounds": [
    {
      "type": "tproxy",
      "tag": "tproxy-in",
      "listen": "127.0.0.1",
      "listen_port": 1080
    }
  ]
}
```

其他相关配置

```json
{
  "router": {
    "rules": [
      {
        "inbound": "tproxy-in",
        "action": "sniff"
      }
    ]
  }
}
```

**使用 nftables 配置防火墙**

### 小结

待续...

## realip 与 fakeip

### realip

相关配置如下

```json
{
  "experimental": {
    "cache_file": {
      "enabled": true,
      "store_fakeip": false
    }
  }
}
```

### fakeip

相关配置如下

```json
{
  "experimental": {
    "cache_file": {
      "enabled": true,
      "store_fakeip": true,
      "store_rdrc": true
    }
  },
  "dns": {
    "servers": [
      {
        "tag": "fakeip",
        "type": "fakeip",
        "inet4_range": "198.18.0.0/15",
        "inet6_range": "fc00::/18"
      }
    ],
    "rules": [
      {
        "query_type": ["A", "AAAA"],
        "rule_set": "geosite-cn",
        "server": "fakeip"
      },
      {
        "query_type": ["A", "AAAA"],
        "server": "fakeip"
      }
    ]
  }
}
```

### 小结

## 定时服务

编辑 `cron` 脚本

```sh
crontab -e
```

例如，每天 4 点钟更新配置文件 `config.json` 并且十分钟后重启生效，`http://xxx` 为订阅转换地址

```
0 4 * * * wget -4 -O /etc/sing-box/config.json "http://xxx"
10 4 * * * service sing-box restart
```

重启生效

```sh
service cron restart
```

## 订阅转换

请使用这个开源项目-> https://github.com/Toperlock/sing-box-subscribe

推荐使用 docker 部署在内网机器上

也可以使用笔者自制的在线订阅转换项目-> https://utabako.madoka.xx.kg

[仓库地址](https://github.com/KannadukiAme/utabako)

## 分流规则

原则上特殊规则写前面，泛用规则写最后。

sing-box 的规则集数据可以从[这里](https://github.com/MetaCubeX/meta-rules-dat/tree/sing)获取

### 常见需求

屏蔽广告

geosite-category-ads-all => block

国外游戏平台下载走直连

geosite-category-games@cn => direct

DMM 走日本代理

geosite-dmm => Japan

Baha 走台湾代理

geosite-bahamut => Taiwan

国内网站走直连

geosite-geolocation-cn => direct

国外网站走代理

final => Proxy

## 其他

如果是直接使用二进制包安装的 sing-box，手动添加 openwrt 服务请参考以下操作

::: details 设置开机启动
编辑简易的 procd 脚本 `/etc/init.d/sing-box`

```sh
#!/bin/sh /etc/rc.common
USE_PROCD=1
START=95
STOP=01

SINGBOX_DIR="/root/sing-box/sing-box-1.10.0-beta.5-linux-amd64v3"
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
:::

## 参考链接

- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
- [sing-box-example](https://github.com/malikshi/sing-box-examples)
- [Create a sample procd init script](https://openwrt.org/docs/guide-developer/procd-init-script-example)
- [Scheduling tasks with cron](https://openwrt.org/docs/guide-user/base-system/cron)
