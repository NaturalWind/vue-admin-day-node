import humps from 'humps';
import JWT from 'jsonwebtoken';
import UserModel from '../model/user';

class Base {
  constructor () {}
  // 异常事件
  exceptionAction (req, res, error) {
    res.json({
      code: error.errno || 500,
      success: false,
      content: error,
      message: '服务器内部错误'
    })
  }
  // 获取客户端IP
  getClientIp (req) {
    let ipAddress = undefined, forwardedIpsStr = req.headers['x-forwarded-for'];
    if (forwardedIpsStr) {
      ipAddress = forwardedIpsStr.split(',')[0];
    }
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress || req.ip;
    }
    return ipAddress;
  }
  // 获取客户端设备
  getClientDevice (req) {
    return req.headers['user-agent'] || '';
  }
  // 格式化字段 将驼峰更改为下划线
  decamelizeKeys (parameter) {
    return humps.decamelizeKeys(parameter);
  }
  // 格式化字段 将下划线更改为驼峰
  camelizeKeys (parameter) {
    return humps.camelizeKeys(parameter);
  }
  // 获取用户信息
  async getUserInfo (req) {
    let userId = null;
    let obj = {
      code: 200,
      success: true,
      content: {},
      message: '获取成功'
    };
    // 解析token
    JWT.verify(req.headers.authorization, 'day-node-vvv', (error, decoded) => {
      // error token过期或解析错误执行的代码块
      // decoded 解码后的信息
      if (error) {
        obj.code = 601;
        obj.success = false;
        obj.content = error;
        obj.message = '身份验证失败';
        return obj;
      }
      userId = decoded.userId;
    })
    // 查询mysql
    try {
      obj.content = await UserModel.getRow({ type: 'userInfo', data: { userId } });
    } catch (error) {
      obj.code = error.errno || 500;
      obj.success = false;
      obj.content = error;
      obj.message = '服务器内部错误';
    }
    return obj;
  }
}

export default Base;
