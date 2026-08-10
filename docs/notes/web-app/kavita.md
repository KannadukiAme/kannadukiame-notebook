# Kavita

> Kavita is an open-source, self-hosted digital library management system primarily designed for managing and reading comics, manga, and ebooks. It is built to provide a streamlined and user-friendly experience for organizing and accessing a personal collection of digital reading materials.

## 容器部署

`compose.yml`

```yaml
services:
  kavita:
    image: jvmilazz0/kavita:latest # Using the stable branch from the official dockerhub repo.
    container_name: kavita
    restart: unless-stopped
    volumes:
      - /mnt/data/manga:/manga
      - /mnt/data/ranobe:/ranobe
      - /mnt/data/doujinshi:/doujinshi
      - /mnt/data/ebooks:/ebooks
      - /root/kavita/config:/kavita/config # /kavita/config must not be changed
    environment:
      - TZ=Asia/­Shanghai
    ports:
      - '5000:5000'
networks:
  proxy:
    external: true
```

## 参考连接

- [Kareadita/Kavita](https://github.com/Kareadita/Kavita)
- [Kavita Wiki](https://wiki.kavitareader.com/getting-started/)
