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
    path: '/login',
    router: require('./routes/login'),
    name: '登录'
  },
  {
    path: '/setting',
    router: require('./routes/setting'),
    name: '设置'
  }
];
