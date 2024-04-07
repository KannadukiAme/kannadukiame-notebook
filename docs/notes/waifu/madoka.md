# MADOKA

MADOKA 是基于 Archlinux 的开发主力机，主要提供 Web 开发环境。桌面环境采用 Hyprland + Waybar 的组合。

## Requirement 必需环境

在进行桌面配置之前，先来完成必需的环境配置。

### Fonts 字体

`noto-fonts-cjk` 支持简体中文、繁体中文、日文、韩文等语言

`ttf-cascadia-code` 漂亮的编程字体

`nerd-fonts` icon 字体集合

```bash
sudo pacman -S noto-fonts-cjk ttf-cascadia-code nerd-fonts
```

### Input Method 输入法

使用输入法框架整合包 `fcitx5-im`

除此以外，中文输入法需要 `fcitx5-chinese-addons`

日文输入法需要 `fcitx5-mozc-ut`

```bash
sudo pacman -S fcitx5-im fcitx5-chinese-addons
```

```bash
paru -S fcitx5-mozc-ut
```

::: tip Kitty
开启 IME 支持

编辑 `~/.zshrc` 添加环境变量

```
GLFW_IM_MODULE=ibus // [!code ++]
```

:::

### zsh

使用 `oh-my-zsh` 开箱即用的 `zsh` 配置

安装 `zsh`

```bash
sudo pacman -S zsh
```

使用官方脚本安装 `oh-my-zsh`

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Audio 声音

`pulseaudio` 一个跨平台的声音服务

`pavucontrol` 是 `pulseaudio` 的图形化客户端界面

```bash
sudo pacman -S pulseaudio pavucontrol
```

### Music 音乐

`mpd` 一个后台音乐播放服务

`ncmpcpp` 强大的 `mpd` 前台播放器

```bash
sudo pacman -S mpd ncmpcpp
```

编辑 `~/.config/mpd/mpd.conf`

```
# Recommended location for database
db_file            "~/.config/mpd/database"

# If running mpd using systemd, delete this line to log directly to systemd.
#log_file           "syslog"

# The music directory is by default the XDG directory, uncomment to amend and choose a different directory
music_directory    "~/aniuta"

# Uncomment to refresh the database whenever files in the music_directory are changed
auto_update "yes"

# Uncomment to enable the functionalities
playlist_directory "~/.config/mpd/playlists"
pid_file           "~/.config/mpd/pid"
state_file         "~/.local/state/mpd/state"
sticker_file       "~/.config/mpd/sticker.sql"
bind_to_address    "127.0.0.1"
port               "6600"

audio_output {
        type            "pipewire"
        name            "PipeWire Sound Server"
}

filesystem_charset   "UTF-8"
```

### Development 开发环境

使用 `nodejs` 语言及包管理工具 `pnpm`

```bash
sudo pacman -S nodejs pnpm
```

**无敌的代码编辑器** `vscode`

::: info 说明
其实官方 package 里有 vscode，但是这个版本并不带 github 账户同步功能

所以只能使用 AUR 里的 vscode，这个版本是二进制发布的不需要编译
:::

```bash
paru -S visual-studio-code-bin
```

## Desktop 桌面环境

### Hyprland

### Waybar

::: details 默认模板

```jsonc
// -*- mode: jsonc -*-
{
  // "layer": "top", // Waybar at top layer
  // "position": "bottom", // Waybar position (top|bottom|left|right)
  "height": 30, // Waybar height (to be removed for auto height)
  // "width": 1280, // Waybar width
  "spacing": 4, // Gaps between modules (4px)
  // Choose the order of the modules
  "modules-left": [
    "sway/workspaces",
    "sway/mode",
    "sway/scratchpad",
    "custom/media"
  ],
  "modules-center": ["sway/window"],
  "modules-right": [
    "mpd",
    "idle_inhibitor",
    "pulseaudio",
    "network",
    "power-profiles-daemon",
    "cpu",
    "memory",
    "temperature",
    "backlight",
    "keyboard-state",
    "sway/language",
    "battery",
    "battery#bat2",
    "clock",
    "tray"
  ],
  // Modules configuration
  // "sway/workspaces": {
  //     "disable-scroll": true,
  //     "all-outputs": true,
  //     "warp-on-scroll": false,
  //     "format": "{name}: {icon}",
  //     "format-icons": {
  //         "1": "",
  //         "2": "",
  //         "3": "",
  //         "4": "",
  //         "5": "",
  //         "urgent": "",
  //         "focused": "",
  //         "default": ""
  //     }
  // },
  "keyboard-state": {
    "numlock": true,
    "capslock": true,
    "format": "{name} {icon}",
    "format-icons": {
      "locked": "",
      "unlocked": ""
    }
  },
  "sway/mode": {
    "format": "<span style=\"italic\">{}</span>"
  },
  "sway/scratchpad": {
    "format": "{icon} {count}",
    "show-empty": false,
    "format-icons": ["", ""],
    "tooltip": true,
    "tooltip-format": "{app}: {title}"
  },
  "mpd": {
    "format": "{stateIcon} {consumeIcon}{randomIcon}{repeatIcon}{singleIcon}{artist} - {album} - {title} ({elapsedTime:%M:%S}/{totalTime:%M:%S}) ⸨{songPosition}|{queueLength}⸩ {volume}% ",
    "format-disconnected": "Disconnected ",
    "format-stopped": "{consumeIcon}{randomIcon}{repeatIcon}{singleIcon}Stopped ",
    "unknown-tag": "N/A",
    "interval": 5,
    "consume-icons": {
      "on": " "
    },
    "random-icons": {
      "off": "<span color=\"#f53c3c\"></span> ",
      "on": " "
    },
    "repeat-icons": {
      "on": " "
    },
    "single-icons": {
      "on": "1 "
    },
    "state-icons": {
      "paused": "",
      "playing": ""
    },
    "tooltip-format": "MPD (connected)",
    "tooltip-format-disconnected": "MPD (disconnected)"
  },
  "idle_inhibitor": {
    "format": "{icon}",
    "format-icons": {
      "activated": "",
      "deactivated": ""
    }
  },
  "tray": {
    // "icon-size": 21,
    "spacing": 10
  },
  "clock": {
    // "timezone": "America/New_York",
    "tooltip-format": "<big>{:%Y %B}</big>\n<tt><small>{calendar}</small></tt>",
    "format-alt": "{:%Y-%m-%d}"
  },
  "cpu": {
    "format": "{usage}% ",
    "tooltip": false
  },
  "memory": {
    "format": "{}% "
  },
  "temperature": {
    // "thermal-zone": 2,
    // "hwmon-path": "/sys/class/hwmon/hwmon2/temp1_input",
    "critical-threshold": 80,
    // "format-critical": "{temperatureC}°C {icon}",
    "format": "{temperatureC}°C {icon}",
    "format-icons": ["", "", ""]
  },
  "backlight": {
    // "device": "acpi_video1",
    "format": "{percent}% {icon}",
    "format-icons": ["", "", "", "", "", "", "", "", ""]
  },
  "battery": {
    "states": {
      // "good": 95,
      "warning": 30,
      "critical": 15
    },
    "format": "{capacity}% {icon}",
    "format-full": "{capacity}% {icon}",
    "format-charging": "{capacity}% ",
    "format-plugged": "{capacity}% ",
    "format-alt": "{time} {icon}",
    // "format-good": "", // An empty format will hide the module
    // "format-full": "",
    "format-icons": ["", "", "", "", ""]
  },
  "battery#bat2": {
    "bat": "BAT2"
  },
  "power-profiles-daemon": {
    "format": "{icon}",
    "tooltip-format": "Power profile: {profile}\nDriver: {driver}",
    "tooltip": true,
    "format-icons": {
      "default": "",
      "performance": "",
      "balanced": "",
      "power-saver": ""
    }
  },
  "network": {
    // "interface": "wlp2*", // (Optional) To force the use of this interface
    "format-wifi": "{essid} ({signalStrength}%) ",
    "format-ethernet": "{ipaddr}/{cidr} ",
    "tooltip-format": "{ifname} via {gwaddr} ",
    "format-linked": "{ifname} (No IP) ",
    "format-disconnected": "Disconnected ⚠",
    "format-alt": "{ifname}: {ipaddr}/{cidr}"
  },
  "pulseaudio": {
    // "scroll-step": 1, // %, can be a float
    "format": "{volume}% {icon} {format_source}",
    "format-bluetooth": "{volume}% {icon} {format_source}",
    "format-bluetooth-muted": " {icon} {format_source}",
    "format-muted": " {format_source}",
    "format-source": "{volume}% ",
    "format-source-muted": "",
    "format-icons": {
      "headphone": "",
      "hands-free": "",
      "headset": "",
      "phone": "",
      "portable": "",
      "car": "",
      "default": ["", "", ""]
    },
    "on-click": "pavucontrol"
  },
  "custom/media": {
    "format": "{icon} {}",
    "return-type": "json",
    "max-length": 40,
    "format-icons": {
      "spotify": "",
      "default": "🎜"
    },
    "escape": true,
    "exec": "$HOME/.config/waybar/mediaplayer.py 2> /dev/null" // Script in resources folder
    // "exec": "$HOME/.config/waybar/mediaplayer.py --player spotify 2> /dev/null" // Filter player based on name
  }
}
```

:::

`~/.config/waybar/config`

```
待完成...
```

重启 `waybar`

```
killall waybar
waybar & disown
```

### Kitty

编辑 `~/.config/kitty/kitty.conf`

```
font_family Cascadia Code
bold_font auto
italic_font auto
bold_italic_font auto
term xterm-256color
```

::: warning 注意
Kitty 在重新渲染 vim 时会出现问题

添加下列配置即可解决渲染问题

```
term xterm-256color
```

:::

### Hyprpaper

壁纸

```bash
sudo pacman -S hyprpaper
```

编辑 `~/.config/hypr/hyprpaper.conf`

```
preload = ~/wallpaper/4.jpg
wallpaper = HDMI-A-1,~/wallpaper/4.jpg
wallpaper = eDP-1,~/wallpaper/4.jpg
splash = false
```

## 参考链接

- [Input method - ArchWiki](https://wiki.archlinux.org/title/Input_method)
- [oh-my-zsh 官网](https://ohmyz.sh/)
