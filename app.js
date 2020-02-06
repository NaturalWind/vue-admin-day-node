import path from 'path';
import express from 'express';
import cmdLogStyle from 'chalk';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import router from './router';

const app = express();
const config = require('config-lite')(__dirname);
// 禁止304缓存
app.disable('etag');
// 全局映射
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || req.headers.referer || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  // 禁止缓存
  res.header("Access-Control-Max-Age", -1);
  res.header("X-Powered-By", 'Express');
  // 预请求
	if (req.method === 'OPTIONS') {
	  res.sendStatus(200);
	} else {
	  next();
	}
});
// 解析body参数
app.use(bodyParser.json());
// 解析非json body参数 extended: false 表示使用系统模块querystring来处理
app.use(bodyParser.urlencoded({extended: false}));
// 路由
router(app);
// 当前端路由为history访问静态文件出现404，该库会把请求地址转到默认（默认情况为index.html）
app.use(history());
// 将静态文件对外开放
app.use(express.static(path.join(__dirname, 'public')));
// 监听端口
// config会根据环境变量NODE_ENV的不同从当前执行进程目录下的config目录加载不同的配置文件
// 如果不设置NODE_ENV则读取默认的default配置文件
app.listen(config.port, () => {
  console.log(cmdLogStyle.green(`监听端口${config.port}`));
});
