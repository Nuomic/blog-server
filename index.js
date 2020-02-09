/*
 * api配置:
 * path api相对于baseUrl的路径（必填）
 * name api接口名字 相当于注释（非必填）
 * router: 每个api接口导出的router（必填）
 */
module.exports = [
  {
    path: '/category',
    router: require('./routes/category'),
    name: '栏目'
  },
  {
    path: '/article',
    router: require('./routes/article'),
    name: '文章'
  },
  {
    path: '/comment',
    router: require('./routes/comment'),
    name: '评论'
  },
  {
    path: '/user',
    router: require('./routes/user'),
    name: '用户'
  },
  {
    path: '/friend',
    router: require('./routes/friend'),
    name: '友情链接'
  },
  {
    path: '/resource',
    router: require('./routes/resource'),
    name: '资源'
  },
  {
    path: '/tag',
    router: require('./routes/tag'),
    name: '标签'
  },
  {
    path: '/setting',
    router: require('./routes/setting'),
    name: '设置'
  }
];
