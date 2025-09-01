# copyparty

> Portable file server with accelerated resumable uploads, dedup, WebDAV, FTP, TFTP, zeroconf, media indexer, thumbnails++ all in one file, no deps

## 容器部署

```yaml
services:
  alist:
    image: copyparty/ac:latest
    container_name: copyparty
    restart: unless-stopped
    volumes:
      - /root/copyparty/cfgdir:/cfg
      - /data:/w
    environment:
      LD_PRELOAD: /usr/lib/libmimalloc-secure.so.NOPE
      # enable mimalloc by replacing "NOPE" with "2" for a nice speed-boost (will use twice as much ram)
      PYTHONUNBUFFERED: 1
      # ensures log-messages are not delayed (but can reduce speed a tiny bit)
    stop_grace_period: 15s # thumbnailer is allowed to continue finishing up for 10s after the shutdown signal
    healthcheck:
      # hide it from logs with "/._" so it matches the default --lf-url filter
      test: ['CMD-SHELL', 'wget --spider -q 127.0.0.1:3923/?reset=/._']
      interval: 1m
      timeout: 2s
      retries: 5
      start_period: 15s
    networks:
      - proxy
    labels:
      - traefik.enable=true
      - traefik.http.routers.copyparty.rule=Host(`${COPYPARTY_DOMAIN}`)
      - traefik.http.routers.copyparty.entrypoints=https
      - traefik.http.routers.copyparty.tls=true
networks:
  proxy:
    external: true
```

- `/root/copyparty/cfgdir:/cfg` 映射配置文件目录
- `/data:/w` 映射共享文件目录

## config

在 `/root/copyparty/cfgdir` 目录下编辑 `example.conf`

配置全局设置、账户、卷以及读写权限

```conf
[global]
  e2dsa  # enable file indexing and filesystem scanning
  e2ts   # and enable multimedia indexing
  z, qr  # and zeroconf and qrcode (you can comma-separate arguments)

# create users:
[accounts]
  username: password   # username: password

# create volumes:
[/]
  .
  accs:
    r: *
    A: username
```

## 参考链接

- [9001/copyparty](https://github.com/9001/copyparty)
