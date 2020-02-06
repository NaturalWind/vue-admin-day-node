import Base from './base';
import JWT from 'jsonwebtoken';
import TokenModel from '../model/token';

class Auth extends Base {
  constructor () {
    super();
    this.checkToken = this.checkToken.bind(this);
  }
  // 验证token
  async checkToken (req, res, next) {
    // 白名单
    const whiteList = ['/token', '/registered'];
    if (whiteList.includes(req.path)) {
      next();
      return;
    }
    // 获取token
    let token = req.headers.authorization;
    if (!token) {
      res.json({
        code: 601,
        success: false,
        content: {},
        message: '身份验证失败'
      })
      return;
    }
    // 解析token
    let decodedInfo = null;
    JWT.verify(token, 'day-node-vvv', (error, decoded) => {
      // error token过期或解析错误执行的代码块
      // decoded 解码后的信息
      if (error) {
        res.json({
          code: 601,
          success: false,
          content: {},
          message: '身份验证失败'
        })
        return;
      }
      decodedInfo = decoded;
    })
    // 获取用户信息
    let content = await this.getUserInfo(req);
    if (content.code !== 200 && content.code !== 601) {
      this.exceptionAction(req, res, content.content);
      return;
    }
    if (content.success) {
      let userInfo = content.content[0];
      // 账号是否正常
      if (userInfo.status !== 1 || userInfo.flag !== 1) {
        res.json({
          code: 605,
          success: false,
          content: {},
          message: '账号已被冻结'
        })
        return;
      }
      try {
        let query = await TokenModel.getRow({ type: 'userId', data: { userId: userInfo.id } });
        let tokenInfo = query[0];
        let mark = null;
        let jwtStr = userInfo.type === 0 ? tokenInfo.phone_token : tokenInfo.token;
        JWT.verify(jwtStr, 'day-node-vvv', (error, decoded) => {
          // error token过期或解析错误执行的代码块
          // decoded 解码后的信息
          if (error) {
            res.json({
              code: 601,
              success: false,
              content: error,
              message: '身份验证失败'
            })
            return;
          }
          mark = decoded.time;
        })
        if (decodedInfo.time !== mark) {
          res.json({
            code: 606,
            success: false,
            content: {
              device: userInfo.type === 0 ? tokenInfo.phone_device : tokenInfo.device,
              ip: userInfo.type === 0 ? tokenInfo.phone_ip : tokenInfo.ip
            },
            message: '账号已被登出'
          })
          return;
        }
      } catch (error) {
        this.exceptionAction(req, res, error);
        return;
      }
    } else {
      res.json({
        code: content.code,
        success: content.success,
        content: content.content,
        message: content.message
      })
      return;
    }
    next();
  }
}

export default new Auth();
