# OpenSSH

ssh是一种安全链接远程服务器的通讯协议，OpenSSH则是基于ssh协议实现的一系列工具套件。

## 套件内容

OpenSSH包含以下工具:

- Client Side(客户端):ssh, scp, sftp
- Key Management(密钥管理):ssh-add, ssh-keysign, ssh-keygen
- Server Side(服务端):sshd, sftp-server, ssh-agent

## sshd的安装与配置

绝大部分的Linux发行版都是内置sshd无需另外安装，Windows下则需要自行安装。

在使用root登录时，需要在配置文件中允许root登录。

```bash
# /etc/ssh/sshd_config

# 允许root登录
PermitRootLogin yes
```

## ssh命令的使用

Linux和Windows默认都是内置ssh命令工具的。

使用ssh远程登陆使用如下

```bash
ssh root@remote.com # 使用root账号登陆远程主机remote.com(可以是IP地址)

ssh -p PORT # 指定端口，默认23

# 根据提示符输入密码即可登陆, 注意密码是不会显示在屏幕上，连星号都不会出现。

# 也可以使用sshpass来指定密码直接登陆
```

如果要使用ssh密钥免密码登录，则需要ssh-keygen工具来生成私钥和公钥。

具体操作方法如下所示。

```bash
ssh-keygen -t rsa

# 不要输入密码
```

产生如下密钥对。

- id_rsa(私钥)
- id_rsa.pub(公钥)

私钥放置在客户端上，公钥放置在需登陆的远程主机上。

```bash
# 以下两种操作选择其一即可
# 在远程主机上执行
cat id_rsa.pub >> ~/.ssh/authorized_keys

# 在客户端上执行
ssh-copy-id -i /root/.ssh/id_rsa.pub root@remote.com
```

::: warning 注意事项

.ssh的目录权限 700

authorized_keys的权限 600

:::

清理缓存

```bash
# ~/.ssh/known_hosts

# 删除对应IP的密钥即可
```

## scp命令的使用

## sftp命令的使用

## 参考链接

1. [OpenSSH官网](https://www.openssh.com/)