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
            text: 'Arch Linux',
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
        text: 'Network Proxy',
        items: [
          {
            text: 'sing-box',
            link: '/notes/network-proxy/sing-box.md',
          },
        ],
        collapsed: false,
      },
      {
        text: 'Web Application',
        items: [
          {
            text: 'Homepage',
            link: '/notes/web-app/homepage.md',
          },
          {
            text: 'Dashy',
            link: '/notes/web-app/dashy.md',
          },
          {
            text: 'qBittorrent',
            link: '/notes/web-app/qbittorrent.md',
          },
          {
            text: 'Traefik',
            link: '/notes/web-app/traefik.md',
          },
          {
            text: 'AList',
            link: '/notes/web-app/alist.md',
          },
          {
            text: 'Nextcloud',
            link: '/notes/web-app/nextcloud.md',
          },
          {
            text: 'Portainer',
            link: '/notes/web-app/portainer.md',
          },
          {
            text: 'Dockge',
            link: '/notes/web-app/dockge.md',
          },
          {
            text: 'Uptime Kuma',
            link: '/notes/web-app/uptime-kuma.md',
          },
          {
            text: 'Jellyfin',
            link: '/notes/web-app/jellyfin.md',
          },
        ],
        collapsed: false,
      },
      {
        text: 'Waifu',
        items: [
          {
            text: 'MADOKA',
            link: '/notes/waifu/madoka.md',
          },
        ],
      },
      {
        text: 'Maid',
        items: [
          {
            text: 'R2S(现役)',
            link: '/notes/maid/r2s.md',
          },
          {
            text: 'SORA(已退役)',
            link: '/notes/maid/sora.md',
          },
          {
            text: 'MISAKI(现役)',
            link: '/notes/maid/misaki.md',
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
