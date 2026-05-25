# Dockhand

> Dockhand is a modern, efficient Docker management application providing real-time container management, Compose stack orchestration, and multi-environment support. All in a lightweight, secure and privacy-focused package.

## 部署

`compose.yml`

```yml
services:
  dockhand:
    image: fnsys/dockhand:latest
    container_name: dockhand
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /root/dockhand/data:/app/data
      - /root/docker-compose:/app/docker-compose
    networks:
      - proxy
networks:
  proxy:
    external: true
```

- `/root/docker-compose` 里放置其他 docker 应用的配置文件，以方便管理

## 参考连接

- [Finsys/dockhand](https://github.com/Finsys/dockhand)
