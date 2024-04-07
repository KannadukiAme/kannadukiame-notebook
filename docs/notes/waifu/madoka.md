# MADOKA

MADOKA 是一款基于 Archlinux ，使用 hyprland 平铺窗口管理的现役主力开发机

## Rice 基本环境配置

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

### terminal 终端

`kitty` 支持跨平台的多功能终端

```bash
sudo pacman -S kitty
```

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

`mpc` 简易音乐播放控制台

`ncmpcpp` 强大的 `mpd` 前台播放器

```bash
sudo pacman -S mpd mpc ncmpcpp
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

### File Manager 文件管理器

`lf` 强大的终端文件管理工具

```bash
sudo pacman -S lf
```

编辑 `~/.config/lf/lfrc` 以开启图标颜色、图片预览等功能

```
set icons
set previewer ~/.config/lf/lf_kitty_preview
set cleaner ~/.config/lf/lf_kitty_clean
```

`~/.config/lf/icon`

::: details icon

```
# vim:ft=conf

# These examples require Nerd Fonts or a compatible font to be used.
# See https://www.nerdfonts.com for more information.

# default values from lf (with matching order)
# ln      l       # LINK
# or      l       # ORPHAN
# tw      t       # STICKY_OTHER_WRITABLE
# ow      d       # OTHER_WRITABLE
# st      t       # STICKY
# di      d       # DIR
# pi      p       # FIFO
# so      s       # SOCK
# bd      b       # BLK
# cd      c       # CHR
# su      u       # SETUID
# sg      g       # SETGID
# ex      x       # EXEC
# fi      -       # FILE

# file types (with matching order)
ln             # LINK
or             # ORPHAN
tw      t       # STICKY_OTHER_WRITABLE
ow             # OTHER_WRITABLE
st      t       # STICKY
di             # DIR
pi      p       # FIFO
so      s       # SOCK
bd      b       # BLK
cd      c       # CHR
su      u       # SETUID
sg      g       # SETGID
ex             # EXEC
fi             # FILE

# file extensions (vim-devicons)
*.styl          
*.sass          
*.scss          
*.htm           
*.html          
*.slim          
*.haml          
*.ejs           
*.css           
*.less          
*.md            
*.mdx           
*.markdown      
*.rmd           
*.json          
*.webmanifest   
*.js            
*.mjs           
*.jsx           
*.rb            
*.gemspec       
*.rake          
*.php           
*.py            
*.pyc           
*.pyo           
*.pyd           
*.coffee        
*.mustache      
*.hbs           
*.conf          
*.ini           
*.yml           
*.yaml          
*.toml          
*.bat           
*.mk            
*.jpg           
*.jpeg          
*.bmp           
*.png           
*.webp          
*.gif           
*.ico           
*.twig          
*.cpp           
*.c++           
*.cxx           
*.cc            
*.cp            
*.c             
*.cs            󰌛
*.h             
*.hh            
*.hpp           
*.hxx           
*.hs            
*.lhs           
*.nix           
*.lua           
*.java          
*.sh            
*.fish          
*.bash          
*.zsh           
*.ksh           
*.csh           
*.awk           
*.ps1           
*.ml            λ
*.mli           λ
*.diff          
*.db            
*.sql           
*.dump          
*.clj           
*.cljc          
*.cljs          
*.edn           
*.scala         
*.go            
*.dart          
*.xul           
*.sln           
*.suo           
*.pl            
*.pm            
*.t             
*.rss           
'*.f#'          
*.fsscript      
*.fsx           
*.fs            
*.fsi           
*.rs            
*.rlib          
*.d             
*.erl           
*.hrl           
*.ex            
*.exs           
*.eex           
*.leex          
*.heex          
*.vim           
*.ai            
*.psd           
*.psb           
*.ts            
*.tsx           
*.jl            
*.pp            
*.vue           
*.elm           
*.swift         
*.xcplayground  
*.tex           󰙩
*.r             󰟔
*.rproj         󰗆
*.sol           󰡪
*.pem           

# file names (vim-devicons) (case-insensitive not supported in lf)
*gruntfile.coffee       
*gruntfile.js           
*gruntfile.ls           
*gulpfile.coffee        
*gulpfile.js            
*gulpfile.ls            
*mix.lock               
*dropbox                
*.ds_store              
*.gitconfig             
*.gitignore             
*.gitattributes         
*.gitlab-ci.yml         
*.bashrc                
*.zshrc                 
*.zshenv                
*.zprofile              
*.vimrc                 
*.gvimrc                
*_vimrc                 
*_gvimrc                
*.bashprofile           
*favicon.ico            
*license                
*node_modules           
*react.jsx              
*procfile               
*dockerfile             
*docker-compose.yml     
*docker-compose.yaml    
*compose.yml            
*compose.yaml           
*rakefile               
*config.ru              
*gemfile                
*makefile               
*cmakelists.txt         
*robots.txt             󰚩

# file names (case-sensitive adaptations)
*Gruntfile.coffee       
*Gruntfile.js           
*Gruntfile.ls           
*Gulpfile.coffee        
*Gulpfile.js            
*Gulpfile.ls            
*Dropbox                
*.DS_Store              
*LICENSE                
*React.jsx              
*Procfile               
*Dockerfile             
*Docker-compose.yml     
*Docker-compose.yaml    
*Rakefile               
*Gemfile                
*Makefile               
*CMakeLists.txt         

# file patterns (vim-devicons) (patterns not supported in lf)
# .*jquery.*\.js$         
# .*angular.*\.js$        
# .*backbone.*\.js$       
# .*require.*\.js$        
# .*materialize.*\.js$    
# .*materialize.*\.css$   
# .*mootools.*\.js$       
# .*vimrc.*               
# Vagrantfile$            

# file patterns (file name adaptations)
*jquery.min.js          
*angular.min.js         
*backbone.min.js        
*require.min.js         
*materialize.min.js     
*materialize.min.css    
*mootools.min.js        
*vimrc                  
Vagrantfile             

# archives or compressed (extensions from dircolors defaults)
*.tar   
*.tgz   
*.arc   
*.arj   
*.taz   
*.lha   
*.lz4   
*.lzh   
*.lzma  
*.tlz   
*.txz   
*.tzo   
*.t7z   
*.zip   
*.z     
*.dz    
*.gz    
*.lrz   
*.lz    
*.lzo   
*.xz    
*.zst   
*.tzst  
*.bz2   
*.bz    
*.tbz   
*.tbz2  
*.tz    
*.deb   
*.rpm   
*.jar   
*.war   
*.ear   
*.sar   
*.rar   
*.alz   
*.ace   
*.zoo   
*.cpio  
*.7z    
*.rz    
*.cab   
*.wim   
*.swm   
*.dwm   
*.esd   

# image formats (extensions from dircolors defaults)
*.jpg   
*.jpeg  
*.mjpg  
*.mjpeg 
*.gif   
*.bmp   
*.pbm   
*.pgm   
*.ppm   
*.tga   
*.xbm   
*.xpm   
*.tif   
*.tiff  
*.png   
*.svg   
*.svgz  
*.mng   
*.pcx   
*.mov   
*.mpg   
*.mpeg  
*.m2v   
*.mkv   
*.webm  
*.ogm   
*.mp4   
*.m4v   
*.mp4v  
*.vob   
*.qt    
*.nuv   
*.wmv   
*.asf   
*.rm    
*.rmvb  
*.flc   
*.avi   
*.fli   
*.flv   
*.gl    
*.dl    
*.xcf   
*.xwd   
*.yuv   
*.cgm   
*.emf   
*.ogv   
*.ogx   

# audio formats (extensions from dircolors defaults)
*.aac   
*.au    
*.flac  
*.m4a   
*.mid   
*.midi  
*.mka   
*.mp3   
*.mpc   
*.ogg   
*.ra    
*.wav   
*.oga   
*.opus  
*.spx   
*.xspf  
*.ape   

# other formats
*.pdf   
```

:::

`~/.config/lf/lf_kitty_preview`

::: details preview

```bash
#!/usr/bin/env bash
file=$1
w=$2
h=$3
x=$4
y=$5

if [[ "$( file -Lb --mime-type "$file")" =~ ^image ]]; then
    kitty +kitten icat --silent --stdin no --transfer-mode file --place "${w}x${h}@${x}x${y}" "$file" < /dev/null > /dev/tty
    exit 1
fi

pistol "$file"

```

:::

`~/.config/lf/lf_kitty_clean`

::: details clean

```bash
#!/usr/bin/env bash

kitty +kitten icat --clear --stdin no --silent --transfer-mode file < /dev/null > /dev/tty
```

:::

### Code Editor 代码编辑器

`vscode` **一个无敌的代码编辑器**

::: info 说明
其实官方 package 自带 vscode，但是这个版本并不带 github 的账号同步功能

所以只能使用 AUR 提供的二进制版 vscode
:::

```bash
paru -S visual-studio-code-bin
```

### Hyprland

不完善配置，仅供过渡使用

`~/.config/hypr/hyprland.conf`

::: details 配置文件

```
# #######################################################################################
# AUTOGENERATED HYPR CONFIG.
# PLEASE USE THE CONFIG PROVIDED IN THE GIT REPO /examples/hypr.conf AND EDIT IT,
# OR EDIT THIS ONE ACCORDING TO THE WIKI INSTRUCTIONS.
# #######################################################################################

#
# Please note not all available settings / options are set here.
# For a full list, see the wiki
#

# See https://wiki.hyprland.org/Configuring/Monitors/
monitor=,preferred,auto,1


# See https://wiki.hyprland.org/Configuring/Keywords/ for more

# Execute your favorite apps at launch
exec-once = waybar & hyprpaper & mpd
exec-once = fcitx5 &

# Source a file (multi-file configs)
# source = ~/.config/hypr/myColors.conf

# Set programs that you use
$terminal = kitty
$fileManager = $terminal -e ranger
$menu = wofi --show drun
$browser = firefox

# Some default env vars.
env = XCURSOR_SIZE,24
env = QT_QPA_PLATFORMTHEME,qt5ct # change to qt6ct if you have that

# For all categories, see https://wiki.hyprland.org/Configuring/Variables/
input {
    kb_layout = us
    kb_variant =
    kb_model =
    kb_options =
    kb_rules =

    follow_mouse = 1

    touchpad {
        natural_scroll = no
    }

    sensitivity = 0 # -1.0 to 1.0, 0 means no modification.
}

general {
    # See https://wiki.hyprland.org/Configuring/Variables/ for more

    gaps_in = 5
    gaps_out = 20
    border_size = 1
    # col.active_border = rgba(33ccffee) rgba(00ff99ee) 45deg
    col.active_border = rgb(66ccff)
    col.inactive_border = rgba(595959aa)

    layout = dwindle

    # Please see https://wiki.hyprland.org/Configuring/Tearing/ before you turn this on
    allow_tearing = false
}

decoration {
    # See https://wiki.hyprland.org/Configuring/Variables/ for more

    rounding = 0

    blur {
        enabled = true
        size = 4
        passes = 1
    }

    drop_shadow = yes
    shadow_range = 4
    shadow_render_power = 3
    col.shadow = rgba(1a1a1aee)
}

animations {
    enabled = yes

    # Some default animations, see https://wiki.hyprland.org/Configuring/Animations/ for more

    bezier = myBezier, 0.05, 0.9, 0.1, 1.05

    animation = windows, 1, 7, myBezier
    animation = windowsOut, 1, 7, default, popin 80%
    animation = border, 1, 10, default
    animation = borderangle, 1, 8, default
    animation = fade, 1, 7, default
    animation = workspaces, 1, 6, default
}

dwindle {
    # See https://wiki.hyprland.org/Configuring/Dwindle-Layout/ for more
    pseudotile = yes # master switch for pseudotiling. Enabling is bound to mainMod + P in the keybinds section below
    preserve_split = yes # you probably want this
}

master {
    # See https://wiki.hyprland.org/Configuring/Master-Layout/ for more
    new_is_master = true
}

gestures {
    # See https://wiki.hyprland.org/Configuring/Variables/ for more
    workspace_swipe = off
}

misc {
    # See https://wiki.hyprland.org/Configuring/Variables/ for more
    force_default_wallpaper = -1 # Set to 0 or 1 to disable the anime mascot wallpapers
}

# Example per-device config
# See https://wiki.hyprland.org/Configuring/Keywords/#per-device-input-configs for more
device {
    name = epic-mouse-v1
    sensitivity = -0.5
}

# Example windowrule v1
# windowrule = float, ^(kitty)$
# Example windowrule v2
# windowrulev2 = float,class:^(kitty)$,title:^(kitty)$
# See https://wiki.hyprland.org/Configuring/Window-Rules/ for more
windowrulev2 = suppressevent maximize, class:.* # You'll probably like this.
windowrulev2 = opacity 0.8 0.8,class:^(kitty)$
windowrulev2 = opacity 0.9 0.9,class:^(Code)$
windowrulev2 = opacity 0.9 0.9,floating:1

# See https://wiki.hyprland.org/Configuring/Keywords/ for more
$mainMod = SUPER

# mpd controls
bind = $mainMod ALT, P, exec, mpc pause
bind = $mainMod ALT, S, exec, mpc play
bind = $mainMod ALT, Q, exec, mpc stop

# Example binds, see https://wiki.hyprland.org/Configuring/Binds/ for more
bind = $mainMod, Q, exec, $terminal
bind = $mainMod, C, killactive,
bind = $mainMod, M, exec, shutdown now
bind = $mainMod, E, exec, $fileManager
bind = $mainMod, F, exec, $browser
bind = $mainMod, V, togglefloating,
bind = $mainMod, R, exec, $menu
bind = $mainMod, P, pseudo, # dwindle
bind = $mainMod, J, togglesplit, # dwindle

# Move focus with mainMod + arrow keys
bind = $mainMod, left, movefocus, l
bind = $mainMod, right, movefocus, r
bind = $mainMod, up, movefocus, u
bind = $mainMod, down, movefocus, d

# Switch workspaces with mainMod + [0-9]
bind = $mainMod, 1, workspace, 1
bind = $mainMod, 2, workspace, 2
bind = $mainMod, 3, workspace, 3
bind = $mainMod, 4, workspace, 4
bind = $mainMod, 5, workspace, 5
bind = $mainMod, 6, workspace, 6
bind = $mainMod, 7, workspace, 7
bind = $mainMod, 8, workspace, 8
bind = $mainMod, 9, workspace, 9
bind = $mainMod, 0, workspace, 10

# Move active window to a workspace with mainMod + SHIFT + [0-9]
bind = $mainMod SHIFT, 1, movetoworkspace, 1
bind = $mainMod SHIFT, 2, movetoworkspace, 2
bind = $mainMod SHIFT, 3, movetoworkspace, 3
bind = $mainMod SHIFT, 4, movetoworkspace, 4
bind = $mainMod SHIFT, 5, movetoworkspace, 5
bind = $mainMod SHIFT, 6, movetoworkspace, 6
bind = $mainMod SHIFT, 7, movetoworkspace, 7
bind = $mainMod SHIFT, 8, movetoworkspace, 8
bind = $mainMod SHIFT, 9, movetoworkspace, 9
bind = $mainMod SHIFT, 0, movetoworkspace, 10

# Example special workspace (scratchpad)
bind = $mainMod, S, togglespecialworkspace, magic
bind = $mainMod SHIFT, S, movetoworkspace, special:magic

# Scroll through existing workspaces with mainMod + scroll
bind = $mainMod, mouse_down, workspace, e+1
bind = $mainMod, mouse_up, workspace, e-1

# Move/resize windows with mainMod + LMB/RMB and dragging
bindm = $mainMod, mouse:272, movewindow
bindm = $mainMod, mouse:273, resizewindow
```

:::

### Waybar

自制简易主题，仅供过渡使用

`~/.config/waybar/config`

::: details 配置文件

```jsonc
{
  "layer": "top",
  "reload_style_on_change": true,
  "modules-left": ["custom/launcher", "cpu", "memory", "disk", "tray"],
  "modules-center": ["hyprland/workspaces"],
  "modules-right": [
    "custom/wallpaper",
    "mpd",
    "network",
    "pulseaudio",
    "battery",
    "clock"
  ],
  "pulseaudio": {
    "format": "{icon} {volume}%",
    "format-bluetooth": "{icon} {volume}%",
    "format-muted": "",
    "format-icons": {
      "headphone": "",
      "hands-free": "",
      "headset": "",
      "phone": "",
      "portable": "",
      "car": "",
      "default": ["", ""]
    },
    "scroll-step": 1,
    "on-click": "pavucontrol",
    "ignored-sinks": ["Easy Effects Sink"]
  },
  "pulseaudio/slider": {
    "min": 0,
    "max": 100,
    "orientation": "horizontal"
  },
  "hyprland/window": {
    "format": "{title}",
    "separate-outputs": true
  },
  "hyprland/workspaces": {
    "format": "{name}",
    "persistent-workspaces": {
      "*": 5, // 5 workspaces by default on every monitor
      "HDMI-A-1": 3 // but only three on HDMI-A-1
    }
  },
  "mpd": {
    "format": "󰎇 {stateIcon} {repeatIcon}{singleIcon}{title} ({elapsedTime:%M:%S}/{totalTime:%M:%S})",
    "format-disconnected": "󰎇 Disconnected",
    "format-stopped": "󰎇 {repeatIcon}{singleIcon}Stopped",
    "max-length": 30,
    "interval": 10,
    "consume-icons": {
      "on": " " // Icon shows only when "consume" is on
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
  "network": {
    "tooltip": false,
    "format-wifi": "  {essid} ({signalStrength}%)",
    "format-ethernet": ""
  },
  "backlight": {
    "tooltip": false,
    "format": " {}%",
    "interval": 1,
    "on-scroll-up": "light -A 5",
    "on-scroll-down": "light -U 5"
  },
  "battery": {
    "states": {
      "good": 95,
      "warning": 30,
      "critical": 20
    },
    "format": "{icon}  {capacity}%",
    "format-charging": " {capacity}%",
    "format-plugged": " {capacity}%",
    "format-alt": "{time} {icon}",
    "format-icons": ["", "", "", "", ""]
  },
  "tray": {
    "icon-size": 18,
    "spacing": 10
  },
  "clock": {
    "interval": 60,
    "tooltip": true,
    "format": "{:%H:%M}",
    "tooltip-format": "{:%Y-%m-%d}"
  },
  "cpu": {
    "interval": 15,
    "format": " {}%",
    "max-length": 10
  },
  "memory": {
    "interval": 30,
    "format": " {}%",
    "max-length": 10
  },
  "disk": {
    "interval": 30,
    "format": " {percentage_used}%",
    "path": "/home"
  },
  "custom/launcher": {
    "format": " ",
    "on-click": "wofi --show drun",
    "on-click-right": "killall wofi"
  },
  "custom/wallpaper": {
    "format": " "
  },
  "bluetooth": {
    "format": " {status}",
    "format-on": "",
    "format-disabled": "", // an empty format will hide the module
    "format-connected": " {num_connections} connected",
    "tooltip-format": "{controller_alias}\t{controller_address}",
    "tooltip-format-connected": "{controller_alias}\t{controller_address}\n\n{device_enumerate}",
    "tooltip-format-enumerate-connected": "{device_alias}\t{device_address}"
  }
}
```

:::

`~/.config/waybar/style.css`

::: details 样式表

```css
* {
  border: none;
  border-radius: 0;
  box-shadow: none;
  font-family: 'Cascadia Code';
  font-size: 18px;
  min-height: 30px;
}

window#waybar {
  background: rgba(43, 48, 59, 0.8);
  color: white;
}

window#waybar.hidden {
  opacity: 0.2;
}

tooltip {
  background: rgba(43, 48, 59, 0.5);
  border: 1px solid rgba(100, 114, 125, 0.5);
}

tooltip label {
  color: white;
}

#workspaces button {
  color: white;
}

#workspaces button:hover {
  background-color: transparent;
  color: black;
}

#workspaces button.active {
  color: #66ccff;
}

#window,
#network,
#bluetooth,
#pulseaudio,
#mpd,
#battery,
#backlight,
#clock,
#memory,
#cpu,
#disk,
#tray,
#custom-launcher,
#custom-wallpaper,
#custom-power {
  margin-top: 6px;
  margin-left: 8px;
  margin-right: 8px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 6px;
  transition: none;
}

#custom-launcher {
  color: #66ccff;
}

#tray {
  background-color: white;
}
```

:::

重启 `waybar`

```
killall waybar
waybar & disown
```

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
- [Hyprland Wiki](https://wiki.hyprland.org/)
- [Waybar Wiki](https://github.com/Alexays/Waybar/wiki)
