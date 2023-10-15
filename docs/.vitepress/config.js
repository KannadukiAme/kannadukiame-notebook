export default {
  title: 'Geek Record',
  description: '关于赛博空间的一些探索纪录。',
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
      { text: 'HOME', link: '/' },
      {
        text: 'RECORD',
        link: '/notes/hypervisor/pve.md',
        activeMatch: '/notes/',
      },
    ],
    sidebar: [
      {
        text: 'Hypervisor',
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
          {
            text: 'OpenWrt',
            link: '/notes/linux/openwrt.md',
          },
        ],
        collapsed: false,
      },
      {
        text: 'Web Application',
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
        text: 'Maid',
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
