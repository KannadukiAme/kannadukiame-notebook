# Dashy

> Dashy is an open source, highly customizable, easy to use, privacy-respecting dashboard app.

## 部署

`compose.yml` 配置如下

```yml
version: '3.8'
services:
  dashy:
    image: lissy93/dashy
    container_name: Dashy
    volumes:
      - /root/dashy/conf.yml:/app/public/conf.yml
    ports:
      - 80:80
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 参考链接

- [Lissy93/dashy](https://github.com/Lissy93/dashy)
