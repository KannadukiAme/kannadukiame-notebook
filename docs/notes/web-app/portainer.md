# Portainer

> docker 容器 web 界面编排工具

## 容器部署

这里使用免费的社区版，即 **portainer-ce**

```yaml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /root/portainer/data:/data
    networks:
      - proxy
    labels:
      - traefik.enable=true
      - traefik.http.routers.portainer.rule=Host(`portainer.misaki.us.kg`)
      - traefik.http.services.portainer.loadbalancer.server.port=9000
      - traefik.http.routers.portainer.entrypoints=https
      - traefik.http.routers.portainer.tls=true
networks:
  proxy:
    external: true
```

- 由于容器内开放多个端口且低数字端口 8000 为废弃端口，traefik 里需要手动指定为 9000 端口
- `/data` 目录存放 portianer 的容器数据

## 备份与迁移

## 参考链接

- [dockerhub 上的 portainer-ce 镜像](https://hub.docker.com/r/portainer/portainer-ce)
- [Install Portainer CE with Docker on Linux](https://docs.portainer.io/start/install-ce/server/docker/linux)
- [portainer/portainer](https://github.com/portainer/portainer)
