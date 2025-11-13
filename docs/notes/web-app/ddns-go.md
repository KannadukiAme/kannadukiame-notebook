# DDNS-GO

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

## 参考链接

- [jeessy2/ddns-go](https://github.com/jeessy2/ddns-go)
