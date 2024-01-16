# Uptime Kuma

> Uptime Kuma is an easy-to-use self-hosted monitoring tool.

## 部署

使用官方 git 仓库提供的 `compose.yml` 配置

```yml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    volumes:
      - ./data:/app/data
    ports:
      - 3001:3001
    restart: unless-stopped
```

## 参考链接

- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)
