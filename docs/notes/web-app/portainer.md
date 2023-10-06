# portainer

> docker 容器 web 界面编排工具

## 部署

这里使用免费的社区版，即 **portainer-ce**

docker-compose 配置文件如下

```yaml
# /var/run/docker.sock don't change it(in Linux)
# /data portainer's datafile
version: '3'
services:
  app:
    image: portainer/portainer-ce:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/data
    ports:
      - 8000:8000
      - 9443:9443
```

## 使用

待续...

## 参考链接

- [dockerhub 上的 portainer-ce 镜像](https://hub.docker.com/r/portainer/portainer-ce)
- [Install Portainer CE with Docker on Linux](https://docs.portainer.io/start/install-ce/server/docker/linux)
