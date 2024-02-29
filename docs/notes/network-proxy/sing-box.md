# sing-box

> The universal proxy platform.

## 在 openwrt 下配置 tun 模式透明网关代理

::: info 版本信息

- ImmortalWrt 23.05.1, r27304-31bc47589e
- sing-box version 1.8.5

:::

### 安装 sing-box

系统 -> 软件包 -> 更新列表

找到 `sing-box` 软件包点击安装，Luci 会自动安装相关依赖

### 配置 sing-box

sing-box 的 tun 模式配置如下

```json
{
  "inbounds": [
    {
      "type": "tun",
      "inet4_address": "172.19.0.1/30",
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

### 运行 sing-box

指定配置文件 `config.json` 并运行 `sing-box`

```bash
sing-box -c config.json run
```

**设置为开机启动**

编辑 `/etc/config/sing-box` 配置文件

::: info

由于 `ui` 目录在 `conffile` 所在目录下，`workdir` 需配置到同个目录

:::

```
config sing-box 'main'
        option enabled '1'
        option user 'root'
        option conffile '/root/sing-box/config.json'
        option workdir '/root/sing-box'
        option log_stderr '1'
        option log_stdout '1'
```

`http://192.168.2.1:9090/ui` -> 查看 `yacd` 面板配置调整规则组的节点

### 在 luci 界面上添加 tun 接口

网络 -> 接口 -> 添加新接口

名称随意填写，选择不配置协议，设备指定为 sing-box 生成的 tun 网口

![](/img/sing-box/1.jpg)

编辑接口 -> 防火墙设置

![](/img/sing-box/2.jpg)

重新启动 openwrt 以使配置生效

### 订阅更新

对于 sing-box 的订阅请使用在线订阅转换 https://github.com/Toperlock/sing-box-subscribe

## 参考链接

- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
