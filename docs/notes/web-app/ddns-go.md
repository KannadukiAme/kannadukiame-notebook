# DDNS-GO

Simple and easy to use DDNS. Support Aliyun, Tencent Cloud, Dnspod, Cloudflare, Callback, Huawei Cloud, Baidu Cloud, Porkbun, GoDaddy, Namecheap, NameSilo...

## 容器部署

`compose.yml`

```yaml
services:
  app:
    image: jeessy/ddns-go
    container_name: ddns-go
    restart: unless-stopped
    ports:
      - '9876:9876'
    volumes:
      - /root/ddns-go:/root
    network_mode: host
```

- `network_mode: host` 网络模式设置为主机模式，以便获取本机所在 IP

## 参考链接

- [jeessy2/ddns-go](https://github.com/jeessy2/ddns-go)
