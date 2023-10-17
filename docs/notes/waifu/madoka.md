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

```bashrc
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

### Kitty

### Hyprpaper

## 参考链接

- [Input method - ArchWiki](https://wiki.archlinux.org/title/Input_method)
- [oh-my-zsh 官网](https://ohmyz.sh/)
