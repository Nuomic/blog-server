# blog-server
1.克隆到本地
2. 在更目录添加一个 config.js 文件 具体如下
module.exports = {
  //端口 默认40000 不更改可不配置
  port: 4000,

  //版本号 默认v1 不更改可不配置
  version: 'v1',

  //前缀 默认/api 不更改可不配置
  baseUrl: '/api',

  //签名 随便填
  SECRET: 'abc',

  //数据库信息 
  dbInfo: {
    username: 'user', //可选 若设置了密码 则需要配置 否则忽略
    password: 'password', //可选  若设置了密码 则需要配置  否则忽略
    localhost: 'localhost', //数据库主机
    dbport: '27017', //数据库端口
    data: 'blogDB', //数据库名
  },
  domain: 'localhost:4000', //当前域名
};

3. npm i 安装依赖
4. npm start 启动server
