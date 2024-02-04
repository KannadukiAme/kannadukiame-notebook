# Traefik

> Traefik (pronounced traffic) is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.

## 部署

反向代理 `whoami` 服务的简单示例

```yml
version: '3.3'

services:
  traefik:
    image: 'traefik:v2.10'
    container_name: 'traefik'
    command:
      #- "--log.level=DEBUG"
      - '--api.insecure=true'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--entrypoints.web.address=:80'
    ports:
      - '80:80'
      - '8080:8080'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'

  whoami:
    image: 'traefik/whoami'
    container_name: 'simple-service'
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.whoami.rule=Host(`whoami.localhost`)'
      - 'traefik.http.routers.whoami.entrypoints=web'
```

各服务单独部署的示例

::: code-group

```yml [traefik]
version: '3.3'

services:
  traefik:
    image: 'traefik:v2.10'
    container_name: 'traefik'
    command:
      #- "--log.level=DEBUG"
      - '--api.insecure=true'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--entrypoints.web.address=:80'
    ports:
      - '80:80'
      - '8080:8080'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
```

```yml [whoami]
version: '3.3'

services:
  whoami:
    image: 'traefik/whoami'
    container_name: 'simple-service'
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.whoami.rule=Host(`whoami.localhost`)'
      - 'traefik.http.routers.whoami.entrypoints=web'
    networks:
      - traefik_default
networks:
  traefik_default:
    external: true
```

:::

## 参考链接

- [traefik/traefik](https://github.com/traefik/traefik/)
