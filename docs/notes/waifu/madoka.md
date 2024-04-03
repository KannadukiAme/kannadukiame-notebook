# MADOKA

MADOKA 是基于 Archlinux 的开发主力机，主要提供 Web 开发环境。桌面环境采用 Hyprland + Waybar 的组合。

## Requirement 必需环境

在进行桌面配置之前，先来完成必需的环境配置。

### IM 输入法

使用输入法框架整合包 `fcitx5-im` 及其配置工具 `fcitx5-configtool` 推荐为 qt 以及 gtk 程序加上 `fcitx5-qt` `fcitx5-gtk`

除此以外，中文输入法需要 `fcitx5-chinese-addons`

日文输入法需要
`fcitx5-mozc-ut`

```bash
pacman -S fcitx5-im fcitx5-configtool fcitx5-qt fcitx5-gtk fcitx5-chinese-addons
```

```bash
yay -S fcitx5-mozc-ut
```

添加环境变量

将以下环境变量添加到 `~/.bashrc` 或者 `~/.zshrc`

```
export GTK_IM_MODULE=fcitx // [!code ++]
export QT_IM_MODULE=fcitx // [!code ++]
export XMODIFIERS=@im=fcitx // [!code ++]
```

### zsh

使用 `oh-my-zsh` 开箱即用的 `zsh` 配置

安装 `zsh`

```bash
pacman -S zsh
```

使用官方脚本安装 `oh-my-zsh`

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Development 开发环境

使用 `nodejs` 语言及包管理工具 `pnpm`

```bash
pacman -S nodejs pnpm
```

**无敌的代码编辑器** `vscode`

```bash
yay -S visual-studio-code-bin
```

## Desktop 桌面环境

### Hyprland

### Waybar

默认模板

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

### Hyprpaper

## 参考链接

- [Input method - ArchWiki](https://wiki.archlinux.org/title/Input_method)
- [oh-my-zsh 官网](https://ohmyz.sh/)
