module.exports = {
  title: 'kksk',
  description: 'some notes for web dev...',
  base: '/kksk/',
  dest: './dist',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: 'Git', link: 'https://github.com/KannadukiAme/kksk.git' }
    ],
    sidebar: [
      '/notes/',
      '/notes/git',
      '/notes/vim',
      '/notes/docker',
      '/notes/ssh',
      '/notes/pi3'
    ],
    lastUpdated: '最近更新'
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-task-lists'))
    }
  }
}