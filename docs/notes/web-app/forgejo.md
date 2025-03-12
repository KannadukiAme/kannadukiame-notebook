# Forgejo

> Forgejo is a self-hosted lightweight software forge.

## 部署

`compose.yml` 配置如下

```yml
networks:
  forgejo:
    external: false
services:
  server:
    image: codeberg.org/forgejo/forgejo:9
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - forgejo
    volumes:
      - ./forgejo:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - 3000:3000
      - 222:22
```

`compose.yml` with `treafik` 配置如下

```yml
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:9
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    networks:
      - traefik_default
    volumes:
      - ./forgejo:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    labels:
      - traefik.enable=true
      - traefik.http.routers.forgejo.rule=Host(`git.hostname.com`)
      - traefik.http.services.forgejo.loadbalancer.server.port=3000
      - traefik.tcp.services.forgejo.loadbalancer.server.port=22
      - traefik.http.routers.forgejo.entrypoints=web
networks:
  traefik_default:
    external: true
```

## 参考链接

- [forgejo/forgejo](https://codeberg.org/forgejo/forgejo)
