# Woodpecker

> Woodpecker is a simple, yet powerful CI/CD engine with great extensibility.

## 部署

以连接 `forgejo` 自建 git 仓库的配置为例

```yml
services:
  woodpecker-server:
    image: woodpeckerci/woodpecker-server:v3
    container_name: woodpecker-server
    restart: unless-stopped
    ports:
      - 9999:8000
    volumes:
      - woodpecker-server-data:/var/lib/woodpecker/
    networks:
      - proxy
    environment:
      - WOODPECKER_OPEN=true
      - WOODPECKER_HOST=${WOODPECKER_HOST}
      - WOODPECKER_GITEA=true
      - WOODPECKER_GITEA_URL=${WOODPECKER_GITEA_URL}
      - WOODPECKER_GITEA_CLIENT=${WOODPECKER_GITEA_CLIENT}
      - WOODPECKER_GITEA_SECRET=${WOODPECKER_GITEA_SECRET}
      - WOODPECKER_AGENT_SECRET=${WOODPECKER_AGENT_SECRET}

  woodpecker-agent:
    image: woodpeckerci/woodpecker-agent:v3
    container_name: woodpecker-agent
    command: agent
    restart: unless-stopped
    depends_on:
      - woodpecker-server
    volumes:
      - woodpecker-agent-config:/etc/woodpecker
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - proxy
    environment:
      - WOODPECKER_SERVER=woodpecker-server:9000
      - WOODPECKER_AGENT_SECRET=${WOODPECKER_AGENT_SECRET}

networks:
  proxy:
    external: true

volumes:
  woodpecker-server-data:
  woodpecker-agent-config:
```

- `${WOODPECKER_HOST}` 必填
- `${WOODPECKER_AGENT_SECRET}` 随机字符串可用 `openssl` 生成
- `${WOODPECKER_GITEA_CLIENT}` `${WOODPECKER_GITEA_SECRET}` 由 gitea/forgejo 生成

```bash
# 随机生成字符串
openssl rand -hex 32
```

## 参考链接

- [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker)
