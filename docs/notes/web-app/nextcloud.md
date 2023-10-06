# Nextcloud

> **Nextcloud** 是提供私人云盘平台的免费开源解决方案。

## 部署

docker-compose 配置模板如下，可根据实际情况修改。此外为了方便调试，没有使用 volume 管理 `/var/www/html` 数据。

```yaml
# "/mnt/disk" is a external storage dir.
# You need to mount your hard disk or remove the line.
version: '2'

volumes:
  db:

services:
  db:
    image: mariadb:10.6
    restart: always
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_PASSWORD=root
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80
    links:
      - db
    volumes:
      - ./html:/var/www/html
      - /mnt/disk:/downloads
    environment:
      - MYSQL_PASSWORD=root
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
```

## 使用

默认登陆地址为 `http://localhost:8080`

::: tip Note
每次修改访问网址时，需要修改 nextcloud 的配置文件，否则会出现无法登录的情况
:::

### 挂载外部存储

安装插件 `External storage support`

![图1](/img/misaki/1.jpg)

找到 `External storage support` 插件，安装之后，在个人设置界面会多出一个外部存储的菜单。

![图2](/img/misaki/2.jpg)

根据 docker-compose 的配置，将挂载路径设置为/downloads 即可

## 参考链接

- [Docker image of Nextcloud](https://github.com/nextcloud/docker)
