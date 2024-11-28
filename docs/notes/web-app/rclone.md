# Rclone

> Rclone is a command-line program to manage files on cloud storage. It is a feature-rich alternative to cloud vendors' web storage interfaces. Over 70 cloud storage products support rclone including S3 object stores, business & consumer file storage services, as well as standard transfer protocols.

## 使用 rclone 挂载 webdav

::: info 前置条件

windows 平台下需要安装 `winfsp`

下载地址见参考链接给出的 git 地址

:::

安装 `rclone`

新建配置 webdav

```
rclone config
```

这里以挂载局域网的 [`alist`](/notes/web-app/alist) 为例，给出具体配置

```
n // 新建配置
remote // 输入配置名称（可随意填写）
51 // 选择WebDAV
http://xxx.local/dav // 输入远程地址
7 // vendor 选择其他
... // 输入用户名和密码，其余默认即可
```

::: warning 注意事项

在填写地址时，需注意有些 webdav 服务要在地址后面加上`/dav`

```
# 无效地址
http://xxx.local // [!code error]

# 有效地址
http://xxx.local/dav
```

:::

挂载 webdav

```
# linux
rclone mount remote:/path /data

# windows
rclone mount remote:/path X:
```

## 设置开机启动

**linux 的情况**

`bash.rc` 下添加对应执行命令即可

**windows 的情况**

编辑以下文本，保存文件名为 `rclone-startup.cmd`

```
rclone.exe mount webdav:/ Z: --no-console --log-file D:\log\rclone.log
```

键入 `Win + R` 在运行里输入

```
shell:startup
```

将其放置在弹出的文件夹里即可

## 参考链接

- [winfsp/winfsp](https://github.com/winfsp/winfsp)
- [Rclone Install](https://rclone.org/install/)
