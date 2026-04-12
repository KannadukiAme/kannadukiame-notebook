# Hermes Agent

> The self-improving AI agent built by Nous Research.

## 安装

初次安装务必执行以下命令，完成初始化配置之后再进行下一步的部署

```bash
docker run -it --rm -v /root/hermes:/opt/data nousresearch/hermes-agent setup
```

## 容器部署

`compose.yml`

```yaml
version: '3.8'
services:
  hermes:
    image: nousresearch/hermes-agent:latest
    container_name: hermes
    restart: unless-stopped
    command: gateway run
    volumes:
      - /root/hermes:/opt/data
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2.0'
```

## 备份与迁移

只需要将 `/root/hermes` 目录下的所有文件备份即可

## 参考链接

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
