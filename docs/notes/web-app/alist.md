# AList

> 🗂️ A file list program that supports multiple storage, powered by Gin and Solidjs.

## 部署

`compose.yml` 配置如下

```yml
version: '3.3'
services:
  alist:
    image: 'xhofe/alist:latest'
    container_name: alist
    volumes:
      - '/etc/alist:/opt/alist/data'
    ports:
      - '5244:5244'
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
    restart: unless-stopped
```

## 参考链接

- [alist](https://github.com/alist-org/alist)
