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

## 文件上传限制

新建 `/data/nginx/custom/server_proxy.conf` 添加以下内容

```txt
client_max_body_size 10G;
proxy_max_temp_file_size 0;
proxy_buffering off;
```

## 参考链接

- [NginxProxyManager/nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
- [nginx_proxy_manager_file_upload_limit](https://www.reddit.com/r/immich/comments/1ciwplu/nginx_proxy_manager_file_upload_limit/)
- [cant-upload-isos-to-my-proxmox](https://forum.proxmox.com/threads/cant-upload-isos-to-my-proxmox-via-nginx-and-cloudflare-tunnel.129948/)
