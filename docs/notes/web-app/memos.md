# Memos

> An open-source, lightweight note-taking solution. The pain-less way to create your meaningful notes. Your Notes, Your Way.

## 部署

`compose.yml` 配置如下

```yml
services:
  memos:
    image: neosmemo/memos:stable
    container_name: memos
    volumes:
      - ~/.memos/:/var/opt/memos
    ports:
      - 5230:5230
    restart: unless-stopped
```

## 备份与迁移

将映射该 `/var/opt/memos` 目录下的

- `memos_prod.db`
- `memos_prod.db-shm`
- `memos_prod.db-wal`

三个文件复制到新容器的映射目录下即可

## 参考链接

- [usememos/memos](https://github.com/usememos/memos)
