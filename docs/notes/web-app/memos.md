# Memos

> An open-source, lightweight note-taking solution. The pain-less way to create your meaningful notes. Your Notes, Your Way.

## 容器部署

```yaml
services:
  memos:
    image: neosmemo/memos:stable
    container_name: memos
    restart: unless-stopped
    volumes:
      - /root/memos/:/var/opt/memos
    networks:
      - proxy
    labels:
      - traefik.enable=true
      - traefik.http.routers.memos.rule=Host(`${MEMOS_DOMAIN}`)
      - traefik.http.routers.memos.entrypoints=https
      - traefik.http.routers.memos.tls=true
networks:
  proxy:
    external: true
```

- `${MEMOS_DOMAIN}` 为自定义域名

## 备份与迁移

将映射该 `/var/opt/memos` 目录下的

- `memos_prod.db`
- `memos_prod.db-shm`
- `memos_prod.db-wal`

三个文件复制到新容器的映射目录下即可

## 参考链接

- [usememos/memos](https://github.com/usememos/memos)
