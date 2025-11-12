# Nginx Proxy Manager

> Docker container for managing Nginx proxy hosts with a simple, powerful interface

## 容器部署

`compose.yml`

```yaml
services:
  app:
    image: 'docker.io/jc21/nginx-proxy-manager:latest'
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - /root/nginx-proxy-manager/data:/data
      - /root/nginx-proxy-manager/letsencrypt:/etc/letsencrypt
    networks:
      - proxy
networks:
  proxy:
    external: true
```

## 参考链接

- [NginxProxyManager/nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
