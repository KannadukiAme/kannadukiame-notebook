# Homepage

> A modern, fully static, fast, secure fully proxied, highly customizable application dashboard with integrations for over 100 services and translations into multiple languages.

## 部署

`compose.yml` 配置如下

```yml
version: '3.3'
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    volumes:
      - /path/to/config:/app/config # Make sure your local config directory exists
      - /var/run/docker.sock:/var/run/docker.sock:ro # optional, for docker integrations
    restart: unless-stopped
```

## 配置

::: code-group

```yml [settings.yaml]
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/settings

title: Misaki Local

theme: dark

background:
  image: /images/bg.jpg
  blur: sm # sm, "", md, xl... see https://tailwindcss.com/docs/backdrop-blur
  saturate: 100 # 0, 50, 100... see https://tailwindcss.com/docs/backdrop-saturate
  brightness: 50 # 0, 50, 75... see https://tailwindcss.com/docs/backdrop-brightness
  opacity: 100 # 0-100

headerStyle: clean

layout:
  Network:
    style: row
    columns: 4

  Misaki:
    style: row
    columns: 2

providers:
  openweathermap: openweathermapapikey
  weatherapi: weatherapiapikey
```

```yml [widgets.yaml]
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/service-widgets

- resources:
    cpu: true
    memory: true
    disk: /
    cputemp: true
    uptime: true
    units: metric # only used by cpu temp
    refresh: 3000 # optional, in ms

- datetime:
    text_size: xl
    format:
      timeStyle: short
```

```yml [docker.yml]
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/docker/

my-docker:
  socket: /var/run/docker.sock
```

```yml [services.yaml]
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/services

- Network:
    - OpenWrt:
        icon: openwrt
        href:
        siteMonitor:
        description: 软路由
    - K3:
        icon: router
        href:
        siteMonitor:
        description: 硬路由
    - OpenClash:
        icon: clash
        href:
        siteMonitor:
        description: Clash Dashboard

- Misaki:
    - Nextcloud:
        icon: nextcloud
        href:
        server: my-docker
        container: nextcloud-app-1
        description: 自建云盘
        widget:
          type: nextcloud
          url:
          username:
          password:
    - Traefik:
        icon: traefik
        href:
        server: my-docker
        container: traefik
        description: 反向代理服务
        widget:
          type: traefik
          url:
    - Dockge:
        icon: dockge
        href:
        server: my-docker
        container: dockge-dockge-1
        description: 容器管理
    - PVE:
        icon: proxmox
        href:
        siteMonitor:
        description: 虚拟机管理
```

:::

## 参考链接

- [gethomepage/homepage](https://github.com/gethomepage/homepage)
