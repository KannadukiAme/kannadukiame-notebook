# Forgejo

> Forgejo is a self-hosted lightweight software forge.

## 部署

`compose.yml` 配置如下

```yml
services:
  server:
    image: codeberg.org/forgejo/forgejo:13
    container_name: forgejo
    restart: unless-stopped
    ports:
      - '3000:3000'
      - '222:22'
    environment:
      - USER_UID=1000
      - USER_GID=1000
    volumes:
      - /root/forgejo/data:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    networks:
      - proxy
networks:
  proxy:
    external: true
```

## 参考链接

- [forgejo/forgejo](https://codeberg.org/forgejo/forgejo)
