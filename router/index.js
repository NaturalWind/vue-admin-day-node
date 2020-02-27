import auth from '../controller/auth';
import token from './token';
import user from './user';
import menu from './menu';
import file from './file';

const routerObj = app => {
  // 身份验证
  app.use('/api/auth', auth.checkToken, token);
  // 用户信息
  app.use('/api/user', auth.checkToken, user);
  // 用户菜单
  app.use('/api/menu', auth.checkToken, menu);
  // 用户文件
  app.use('/api/file', auth.checkToken, file);
}

export default routerObj;
