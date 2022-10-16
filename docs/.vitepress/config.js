module.exports = {
  title: '雨之书',
  description: 'The book of KannadukiAme',
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '最近更新',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KannadukiAme/kannadukiame-notebook.git' }
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/linux/arch', activeMatch: '/notes/' },
    ],
    sidebar: [
      {
        text: '系统相关',
        collapsible: true,
        items: [
          {
            text:'Arch',link:'/notes/linux/arch'
          },
          {
            text:'Manjaro-Architect',link:'/notes/linux/manjaro-architect'
          },
          {
            text:'Manjaro-i3',link:'/notes/linux/manjaro-i3'
          },
          {
            text:'OpenWrt',link:'/notes/linux/openwrt'
          },
          {
            text:'Ubuntu',link:'/notes/linux/ubuntu'
          },
          {
            text:'Windows',link:'/notes/win/win'
          }
        ]
      },
      {
        text: '虚拟化技术',
        collapsible: true,
        items: [
          {
            text:'Docker',link:'/notes/virtualization/docker'
          },
          {
            text:'Proxmox VE',link:'/notes/virtualization/pve'
          },
        ]
      },
      {
        text: '系统工具',
        collapsible: true,
        items: [
          {
            text:'SSH',link:'/notes/system-tools/ssh'
          }
        ]
      },
      {
        text: '编辑器',
        collapsible: true,
        items: [
          {
            text:'Vim',link:'/notes/editor/vim'
          },
          {
            text:'VSCode',link:'/notes/editor/vscode'
          }
        ]
      },
      {
        text: 'Web开发',
        collapsible: true,
        items: [
          {
            text:'代码风格',link:'/notes/web-development/code-style'
          },
          {
            text:'Git',link:'/notes/web-development/git'
          },
          {
            text:'Webpack',link:'/notes/web-development/webpack'
          }
        ]
      },
      {
        text: 'Web服务',
        collapsible: true,
        items: [
          {
            text:'私人网盘 Nextcloud',link:'/notes/web-server/nextcloud'
          },
          {
            text:'媒体服务 Jellyfin',link:'/notes/web-server/jellyfin'
          }
        ]
      }
    ],
    footer: {
      copyright: 'MIT Licensed | Copyright © 2019-2022 KannadukiAme'
    }
  }
}
