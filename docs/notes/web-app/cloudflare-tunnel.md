# Cloudflare Tunnel

> Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address.

## 部署

本容器与其他提供服务的容器处于同一网络，这样便于解析

```yml
services:
  cloudflare-tunnel:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare-tunnel
    restart: unless-stopped
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    networks:
      - proxy
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
networks:
  proxy:
    external: true
```

- `TUNNEL_TOKEN` 用于连接 cloudflare 隧道的令牌

在 cf 上反向代理本地服务地址可使用容器名称，比如

```
http://container_name:port
```
