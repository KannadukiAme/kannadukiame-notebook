# Syncthing

> Syncthing is a continuous file synchronization program. It synchronizes files between two or more computers.

## 部署

```yml
services:
  syncthing:
    image: syncthing/syncthing
    container_name: syncthing
    restart: unless-stopped
    hostname: my-syncthing
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - /root/syncthing:/var/syncthing
    network_mode: host
    healthcheck:
      test: curl -fkLsS -m 2 127.0.0.1:8384/rest/noauth/health | grep -o --color=never OK || exit 1
      interval: 1m
      timeout: 10s
      retries: 3
```

默认 web 访问地址为 `http://IP:8384`

## 参考连接

- [syncthing/syncthing](https://github.com/syncthing/syncthing)
