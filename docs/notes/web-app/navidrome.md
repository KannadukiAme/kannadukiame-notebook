# Navidrome

> Navidrome is an open source web-based music collection server and streamer. It gives you freedom to listen to your music collection from any browser or mobile device. It's like your personal Spotify!

## 部署

`compose.yml` 配置如下

```yml
services:
  navidrome:
    image: deluan/navidrome:latest
    user: 1000:1000 # should be owner of volumes
    ports:
      - '4533:4533'
    restart: unless-stopped
    environment:
      # Optional: put your config options customization here. Examples:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ''
    volumes:
      - '/path/to/data:/data'
      - '/path/to/your/music/folder:/music:ro'
```

`compose.yml` with `treafik` 配置如下

```yml
services:
  navidrome:
    image: deluan/navidrome:latest
    restart: unless-stopped
    environment:
      # Optional: put your config options customization here. Examples:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ''
    volumes:
      - '/path/to/data:/data'
      - '/path/to/your/music/folder:/music:ro'
    labels:
      - traefik.enable=true
      - traefik.http.routers.navidrome.rule=Host(`music.hostname.com`)
      - traefik.http.routers.navidrome.entrypoints=web
    networks:
      - traefik_default
networks:
  traefik_default:
    external: true
```

## 参考链接

- [navidrome/navidrome](https://github.com/navidrome/navidrome)
