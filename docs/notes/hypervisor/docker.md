# Docker

> 记录docker容器的基本操作和镜像配置

## 安装

Windows平台下安装

例如:https://store.docker.com/editions/community/docker-ce-desktop-windows

::: tip Note
Win10的Docker CE需要开启Hyper-V，默认Docker会自动帮你开。一旦开启，Vitural Box会无法启用，只能关闭Hyper-V。因此，Dokcer CE和Vitural Box无法同时启动。Hyper-V在【windows功能】选择开启或关闭。
:::

Linux平台下安装

```bash
curl -sSL https://get.docker.com/ | sh # 需root
```

::: warning 注意事项
manjaro无法使用这种方式安装，直接使用pacman安装即可
:::

## 配置

需要阿里云加速器

注册登陆申请一个即可

https://zrv2x9z2.mirror.aliyuncs.com

linux下在/etc/docker/daemon.json输入以下配置

```json
{
  "registry-mirrors":["https://zrv2x9z2.mirror.aliyuncs.com"]
}
```

然后执行以下命令重启

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 常用命令

```bash
docker pull [image-name] # 拉取指定的docker镜像
docker images # 列出已经拉取的docker镜像
docker image ls # 列出已经拉取的docker镜像
docker ps # 列出正在运行的容器
docker contianer ls # 列出正在运行的容器
docker ps -a # 列出所有容器
docker container stop [container-name] # 停止正在运行的容器
docker container kill [container-name] # 杀死正在运行的容器(不安全)
docker container rm [container-name] # 移除已经停止的容器
docker exec -it [container-name] bash # 进入容器并执行bash命令(常用于操作容器内部)
docker run -p 80:80 --name [some-name] -d -v /xxx:/docker [container-name] # 启动指定容器，映射端口和数据卷，指定名称，后台运行
docker build -t [image-name] . # 使用Dockerfile构建并指定镜像名称
```

## 定制开发环境镜像

两种定制方法：

1.使用commit保存镜像

2.使用dockerfile脚本构建镜像

::: tip Note
一般建议生产环境下使用dockerfile构建镜像
:::

## 镜像备份与迁移

```bash
docker commit # 将在运行的容器生成镜像
docker save # 将镜像生成tar文件
```

## docker-compose的使用

编排2个以上的容器建议使用docker-compose

基本操作

```bash
docker-compose up -d # 以后台方式启动容器
docker-compose down # 关闭启动的容器
```

例如nginx镜像的docker-compse.yml文件模板如下

```yaml
version: "3"
services:
	nginx:
		image: nginx
		volumes:
			- /some/content:/usr/share/nginx/html:ro
		ports:
			- "8080:80"
    restart: always
    command: # docker run ... command
```

## 部署常见Web服务

### nginx

```bash
docker run --name some-nginx -p 8080:80 -v /some/content:/usr/share/nginx/html:ro -d nginx
```

### apache2

### node

### gitlab-runner

### gitlab CE

```bash
docker run --detach \
	--hostname gitlab.example.com \
	--publish 443:443 --publish 80:80 --publish 22:22 \
	--name gitlab \
	--restart always \
	--volume /srv/gitlab/config:/etc/gitlab \
	--volume /srv/gitlab/logs:/var/log/gitlab \
	--volume /srv/gitlab/data:/var/opt/gitlab \
	gitlab/gitlab-ce:latest
```

## 容器互联

```bash
# 创建自定义docker网络my-net
docker create network -d bridge my-net

# 开启两个容器连入自定义docker网络
docker run -it --name alpine1 --network my-net alpine:3.8
docker run -it --name alpine2 --network my-net alpine:3.8
```

docker-compose写法如下
```yaml
version: "3"
services:
  a1:
    image: alpine:3.8
    networks:
      - my-net
  a2:
    image: alpine:3.8
    networks:
      - my-net
networks:
  my-net:
```

## 多阶段构建

以vue项目在node容器构建，并部署到nginx服务为例

Dockerfile如下

```bash
FROM node:11-alpine as build-stage

WORKDIR /app

COPY . .

RUN ls & \
    yarn & \
    yarn build

FROM nginx:1.15-alpine as depoly-stage

COPY --from=0 /app/dist/app /usr/share/nginx/html
```

::: tip Note
将上一个容器构建的输出作为下一个容器的输入是多阶段构建的关键之处
:::

## 其他

### 获取Docker容器所有IP地址

```bash
docker inspect -f '{{.Name}} - {{.NetworkSettings.IPAddress }}' $(docker ps -aq)
```
