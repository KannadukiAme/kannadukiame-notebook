# Jellyfin

> Jellyfin is the volunteer-built media solution that puts you in control of your media.

## 部署

直接使用官方提供的 `docker-compose` 配置模板

```yml
version: '3.5'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    network_mode: 'host'
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/sda2:/media
    restart: 'unless-stopped'
    extra_hosts:
      - 'host.docker.internal:host-gateway'
```

`/mnt/sda2` 虚拟机挂载外部存储目录

部署完毕后，进入 `http://localhost:8096` 开始配置

## 参考链接

- [jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)
