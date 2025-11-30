# redroid

redroid (Remote anDroid) is a GPU accelerated AIC (Android In Cloud) solution.

## 容器部署

`compose.yml`

使用 Intel 核显

`redroid` 选项为官方原版, `houdini` 选项为 houdini 转义第三方版本

要使用软件渲染，`androidboot.redroid_gpu_mode` 改为 guest

::: code-group

```yaml [redroid]
services:
  app:
    image: redroid/redroid:12.0.0_64only-latest
    container_name: redroid
    privileged: true
    restart: unless-stopped
    ports:
      - '5555:5555'
    volumes:
      - ~/redroid/data:/data
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128
      - /dev/dri/card0:/dev/dri/card0
    command:
      - androidboot.redroid_gpu_mode=host
```

```yaml [houdini]
services:
  app:
    image: erstt/redroid:12.0.0_houdini_MUMU
    container_name: redroid-houdini
    restart: unless-stopped
    tty: true
    stdin_open: true
    privileged: true
    ports:
      - 5555:5555
    volumes:
      - ~/redroid-houdini/data:/data
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128
      - /dev/dri/card0:/dev/dri/card0
    command:
      - androidboot.redroid_gpu_mode=host
      - androidboot.redroid_width=720
      - androidboot.redroid_height=1280
      - ro.enable.native.bridge.exec64=1
      - ro.dalvik.vm.native.bridge=libhoudini.so
```

:::

使用 scrcpy 来远程投屏

```bash
scrcpy --tcpip=REMOTE_IP:5555 -m 1280 --no-audio
```

## 参考链接

- [remote-android/redroid-doc](https://github.com/remote-android/redroid-doc)
