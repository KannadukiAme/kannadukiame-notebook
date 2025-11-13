# Vaultwarden

> Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs

## 容器部署

```yml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    ports:
      - '8000:80'
    environment:
      DOMAIN: https://${VAULTWARDEN_DOMAIN}
      SIGNUPS_ALLOWED: true
    volumes:
      - /root/vw/data/:/data/
    networks:
      - proxy
networks:
  proxy:
    external: true
```

- `${VAULTWARDEN_DOMAIN}` 为自定义域名
- `SIGNUPS_ALLOWED: true` 允许注册（若仅个人使用，请将值改为`false`）

## 自动更新

## 备份与迁移

## 参考链接

- [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)
