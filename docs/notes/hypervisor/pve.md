# Proxmox VE

> 基于 Debian Linux 的虚拟机解决方案,提供 Web UI 或 CLI 管理方式

## 安装

使用官方提供的[镜像](https://www.proxmox.com/en/downloads)，linux 下直接使用 dd 命令烧录到 u 盘即可，windows 下推荐使用 rufus 工具。

## 使用

默认 web 页面管理地址为 `https://localhost:8006`

### 创建 LXC 容器

![](/img/hypervisor/pve-1.jpg)

如图点击模板按钮，可以看到选择页面。

![](/img/hypervisor/pve-2.jpg)

选择任意镜像下载即可。

点击主界面右上角的创建 CT，根据步骤按需完成设置。

![](/img/hypervisor/pve-3.jpg)

![](/img/hypervisor/pve-4.jpg)

![](/img/hypervisor/pve-5.jpg)

![](/img/hypervisor/pve-6.jpg)

![](/img/hypervisor/pve-7.jpg)

![](/img/hypervisor/pve-8.jpg)

![](/img/hypervisor/pve-9.jpg)

### LXC 容器硬盘直通

将宿主的 sda1 硬盘分区直通给 id 为 100 的 lxc 容器，挂载路径为 `/data`

```bash
pct set 100 -mp0 /dev/sda1,mp=/data
```

### 虚拟机硬盘直通

查看需要直通硬盘的型号，也可以直接在 pve 的 web 管理界面上直接查找

```bash
ls /dev/disk/by-id/
```

将宿主的硬盘直通给 id 为 101 的虚拟机，使用 sata 接口

```bash
qm set 101 --sata0 /dev/disk/by-id/ata-WDC_WD20SPZX-08UA7_WD-WXL1EC8FYULY
```

## 参考链接

- [Proxmox VE Administration Guide](https://pve.proxmox.com/pve-docs/pve-admin-guide.pdf)
