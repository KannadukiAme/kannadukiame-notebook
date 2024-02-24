# qBittorrent

> qBittorrent is a bittorrent client programmed in C++ / Qt that uses libtorrent (sometimes called libtorrent-rasterbar) by Arvid Norberg.

## 配置

使用 `linuxserver/qbittorrent` 维护的 `docker` 镜像

```yml
version: '3'
services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - WEBUI_PORT=8080
      - TORRENTING_PORT=6881
    volumes:
      - /path/to/appdata/config:/config
      - /path/to/downloads:/downloads
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped
```

## 参考链接

- [linuxserver/qbittorrent](https://docs.linuxserver.io/images/docker-qbittorrent/#torrenting_port)
- [linuxserver/docker-qbittorrent](https://github.com/linuxserver/docker-qbittorrent)
- [qbittorrent/qBittorrent](https://github.com/qbittorrent/qBittorrent)
