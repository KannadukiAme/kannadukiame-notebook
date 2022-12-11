# VSCode

VSCode是一款免费的轻量级代码编辑工具(与重量级的开发集成环境不同)，目前类似代码编辑工具的有Notepad++, Sublime Text等。非常适用于开发前端web页面以及nodejs后端程序，也可编辑一些简单的python脚本。

## Extensions & Config 插件及配置

个人必备插件列表清单

- EditorConfig for VS Code
- GitHub Theme (Github Light/Dark主题必需)
- Volar (Vue3开发支持)
- GitLens
- Remote Development(包含Remote - SSH, WSL, Dev Containers三个插件)

### EditorConfig 代码风格设置

.editorconfig一般配置如下

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

js/ts代码每行缩进设定为2个空格。这似乎是js代码的默认风格，不要问为什么，也不要随意更改。其他语言代码风格可自行按照喜好设置。

完整的editorconfig配置文档可参考[这里](https://editorconfig.org/)。

### Remote - SSH 插件

非常适用于服务器远程开发，一般推荐使用ssh密钥登录，因为使用密码登录每次都需要输入两次，非常不方便。

VSCode提供ssh_config登录配置文件，大致如下配置，注意指定的私钥文件路径即可。

```
Host alias
    HostName 192.168.x.xx
    User xxx
    IdentityFile xxx\.ssh\id_rsa
```

::: warning 注意事项

该插件必须要勾选图中的设置，否则无法输入密码登录ssh

:::

![vscode-remote-ssh-settings](/img/vscode-remote-ssh-settings.jpg)

## Preferences 个人偏好

Theme 主题

- Github Light/Dark

Font 字体

```
'Cascadia Code',Microsoft Yahei UI Light, Consolas, 'Courier New', monospace
```

Cascadia Code字体文件在[这里](https://github.com/microsoft/cascadia-code)下载。

字体配置

```json
{
    "editor.fontFamily": "'Cascadia Code', Microsoft Yahei UI Light, Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true
}
```

## setting.json 完整配置

仅供备份与参考，随时会根据需要更新。

```json
{
  "editor.fontFamily": "'Cascadia Code', Microsoft Yahei UI Light, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "files.autoSave": "off",
  "workbench.colorTheme": "GitHub Dark",
  "editor.renderControlCharacters": true,
  "javascript.format.semicolons": "remove",
  "typescript.format.semicolons": "remove",
  "explorer.confirmDelete": false,
  "vetur.validation.template": false,
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      "vue"
  ],
  "eslint.format.enable": true,
  "eslint.run": "onSave",
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  "debug.javascript.autoAttachFilter": "disabled",
  "[vue]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
      "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  }
}
```