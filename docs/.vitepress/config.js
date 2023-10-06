export default {
  title: '雨之书',
  description: 'The book of KannadukiAme',
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: '最近更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/KannadukiAme/kannadukiame-notebook.git',
      },
    ],
    outline: [2, 6],
    nav: [
      { text: '首页', link: '/' },
      {
        text: '笔记',
        link: '/notes/hypervisor/pve.md',
        activeMatch: '/notes/',
      },
    ],
    sidebar: [
      {
        text: '虚拟化方案',
        items: [
          {
            text: 'Proxmox VE',
            link: '/notes/hypervisor/pve.md',
          },
          {
            text: 'Docker',
            link: '/notes/hypervisor/docker.md',
          },
        ],
        collapsed: false,
      },
      {
        text: 'Linux',
        items: [
          {
            text: 'Archlinux',
            link: '/notes/linux/arch.md',
          },
        ],
        collapsed: false,
      },
      {
        text: 'Web应用',
        items: [
          {
            text: 'Nextcloud',
            link: '/notes/web-app/nextcloud.md',
          },
          {
            text: 'Portainer',
            link: '/notes/web-app/portainer.md',
          },
        ],
        collapsed: false,
      },
      {
        text: '系统相关',
        items: [
          {
            text: 'OpenWrt',
            link: '/notes/linux/openwrt.md',
          },
        ],
        collapsed: false,
      },
      {
        text: '女仆',
        items: [
          {
            text: 'SORA(Raspberry Pi 3 Model B)',
            link: '/notes/sora.md',
          },
          {
            text: 'MISAKI(Proxmox VE)',
            link: '/notes/misaki.md',
          },
        ],
        collapsed: false,
      },
    ],
    docFooter: {
      prev: '<-',
      next: '->',
    },
    footer: {
      copyright: 'Copyright © 2019-2023 KannadukiAme',
    },
  },
}
