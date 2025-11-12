# Portainer

> Making Docker and Kubernetes management easy.

## 容器部署

`compose.yml`

```yaml
services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    ports:
      - '9000:9000'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /root/portainer/data:/data
    networks:
      - proxy
networks:
  proxy:
    external: true
```

- `/data` 目录存放 portianer 的容器数据

## 参考链接

- [dockerhub 上的 portainer-ce 镜像](https://hub.docker.com/r/portainer/portainer-ce)
- [Install Portainer CE with Docker on Linux](https://docs.portainer.io/start/install-ce/server/docker/linux)
- [portainer/portainer](https://github.com/portainer/portainer)
