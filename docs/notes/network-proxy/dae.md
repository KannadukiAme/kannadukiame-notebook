# dae

> dae, means goose, is a high-performance transparent proxy solution.

## daed 面板

推荐直接使用 `daed` 面板

在 openwrt 软件包管理中直接安装 `luci-app-daed` 即可

## 配置

DNS

```
upstream {
  alidns: 'udp://223.5.5.5:53'
  cloudflaredns: 'https://1.1.1.1/dns-query'
  dnsmasq: 'udp://127.0.0.1:53'
}
routing {
  request {
    qname(suffix: custom.local) -> dnsmasq
    qname(geosite:cn) -> alidns
    fallback: cloudflaredns
  }
}
```

路由

```
pname(NetworkManager, systemd-resolved, dnsmasq) -> must_direct
dip(geoip:private) -> direct
dip(geoip:cn) -> direct
# steam download to direct
domain(geosite:steam@cn) -> direct
domain(suffix: steamserver.net) -> direct
domain(geosite:cn) -> direct
fallback: proxy
```

## 参考链接

- [daeuniverse/dae](https://github.com/daeuniverse/dae)
- [daeuniverse/daed](https://github.com/daeuniverse/daed)
