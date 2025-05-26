# Vaultwarden

> Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs

## 容器部署

```yml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    environment:
      DOMAIN: https://vw.misaki.us.kg
    volumes:
      - /root/vw/data/:/data/
    networks:
      - proxy
    labels:
      - traefik.enable=true
      - traefik.http.routers.vaultwarden.rule=Host(`vw.misaki.us.kg`)
      - traefik.http.routers.vaultwarden.entrypoints=https
      - traefik.http.routers.vaultwarden.tls=true
networks:
  proxy:
    external: true
```

## 自动更新

## 备份与迁移

## 参考链接

- [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
