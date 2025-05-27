# AList

> 🗂️ A file list program that supports multiple storage, powered by Gin and Solidjs.

## 容器部署

```yaml
services:
  alist:
    image: xhofe/alist:latest
    container_name: alist
    restart: unless-stopped
    volumes:
      - /etc/alist:/opt/alist/data
      - /data:/downloads
    networks:
      - proxy
    labels:
      - traefik.enable=true
      - traefik.http.routers.alist.rule=Host(`${ALIST_DOMAIN}`)
      - traefik.http.routers.alist.entrypoints=https
      - traefik.http.routers.alist.tls=true
networks:
  proxy:
    external: true
```

- `${ALIST_DOMAIN}` 为自定义域名
- `/data:/downloads` 为自定义挂载目录

## 参考链接

- [alist](https://github.com/alist-org/alist)
