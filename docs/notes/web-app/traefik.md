# Traefik

> Traefik (pronounced traffic) is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.

## 容器部署

`compose.yml`

```yaml
services:
  traefik:
    image: traefik:v3.3
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443
    environment:
      CF_DNS_API_TOKEN: ${CF_DNS_API_TOKEN}
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /root/traefik/traefik.yml:/traefik.yml:ro
      - /root/traefik/acme.json:/acme.json
      # - /root/traefik/config.yml:/config.yml:ro
    labels:
      - traefik.enable=true
      - traefik.http.routers.traefik.entrypoints=http
      - traefik.http.routers.traefik.rule=Host(`${TRAEFIK_DOMAIN}`)
      - traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https
      - traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https
      - traefik.http.routers.traefik.middlewares=traefik-https-redirect
      - traefik.http.routers.traefik-secure.entrypoints=https
      - traefik.http.routers.traefik-secure.rule=Host(`${TRAEFIK_DOMAIN}`)
      - traefik.http.routers.traefik-secure.tls=true
      - traefik.http.routers.traefik-secure.tls.certresolver=cloudflare
      - traefik.http.routers.traefik-secure.tls.domains[0].main=${MY_DOMAIN}
      - traefik.http.routers.traefik-secure.tls.domains[0].sans=*.${MY_DOMAIN}
      - traefik.http.routers.traefik-secure.service=api@internal
networks:
  proxy:
    external: true
```

- `CF_DNS_API_TOKEN` cloudflare 的 api-token ，权限设置为 `区域-区域-读取 区域-DNS-编辑` 即可
- `TRAEFIK_DOMAIN` treafik 的自定义域名
- `MY_DOMAIN` 申请的域名

在当前目录下创建 `traefik.yml` 以及 `acme.json`

```yml
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ':80'
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ':443'
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: 'unix:///var/run/docker.sock'
    exposedByDefault: false
  # file:
  #   filename: /config.yml
certificatesResolvers:
  cloudflare:
    acme:
      email: misuzunagisa@gmail.com
      storage: acme.json
      # caServer: https://acme-v02.api.letsencrypt.org/directory # prod (default)
      caServer: https://acme-staging-v02.api.letsencrypt.org/directory # staging
      dnsChallenge:
        provider: cloudflare
        #disablePropagationCheck: true # uncomment this if you have issues pulling certificates through cloudflare, By setting this flag to true disables the need to wait for the propagation of the TXT record to all authoritative name servers.
        #delayBeforeCheck: 60s # uncomment along with disablePropagationCheck if needed to ensure the TXT record is ready before verification is attempted
        resolvers:
          - '1.1.1.1:53'
          - '1.0.0.1:53'
```

::: warning
`acme.json` 的权限必须设置为 600

```bash
chmod 600 acme.json
```

:::

## 参考链接

- [traefik/traefik](https://github.com/traefik/traefik/)
