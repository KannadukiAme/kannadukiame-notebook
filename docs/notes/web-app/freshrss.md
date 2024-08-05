# FreshRSS

> FreshRSS is a self-hosted RSS and Atom feed aggregator. It is lightweight, easy to work with, powerful, and customizable.

## 部署

使用自带的 sqlite 数据库

```yml
version: '2.4'
volumes:
  data:
  extensions:
services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    hostname: freshrss
    restart: unless-stopped
    logging:
      options:
        max-size: 10m
    volumes:
      - data:/var/www/FreshRSS/data
      - extensions:/var/www/FreshRSS/extensions
    ports:
      - '9999:80'
    environment:
      TZ: Asia/Shanghai
      CRON_MIN: 2,32
      TRUSTED_PROXY: 172.16.0.1/12 192.168.2.1/16
```

## 参考链接

- [FreshRSS/FreshRSS](https://github.com/FreshRSS/FreshRSS)
