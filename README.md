## 启动配置
```
# 导入lib目录->mysql目录->init.sql文件到mysql中
# 将config目录下的 default.js development.js 文件中的mysql配置信息完善
```

## 运行
```
克隆项目
git clone https://github.com/NaturalWind/vue-admin-day-node.git

进入项目目录
cd vue-admin-day-node

安装依赖
npm install

运行项目
npm run dev

或

热更新运行项目
npm run hot
```

## 项目结构
```
|-- config              // 公共配置
|-- controller          // 控制器
|-- lib
|   |-- mysql           // mysql
|   |-- util            // 公共方法
|-- model               // model
|-- node_module         // 项目依赖包
|-- public              // 静态资源
|-- router              // 路由
|-- validate            // 数据验证
|-- .babelrc            // babel-loader 配置
|-- .gitignore          // git 忽略项
|-- app.js              // 入口文件
|-- index.js            // 启动文件
```

## 状态码
|状态码|说明|
|:----|:---|
|200|成功|
|500|服务器内部错误|
|601|身份验证失败|
|602|验证-参数错误|
|603|数据已存在|
|604|数据不存在|
|605|无操作权限|
|606|登出|