import Base from './base';
import UserModel from '../model/user';
import TokenModel from '../model/token';
import JWT from 'jsonwebtoken';
import { aesDecrypt } from '../lib/util/util';

class Token extends Base {
  constructor () {
    super();
    this.setToken = this.setToken.bind(this);
  }
  // 设置token
  async setToken (req, res, next) {
    // 查询用户
    let query = [];
    try {
      let obj = {
        type: 'account',
        data: {
          account: req.body.account
        }
      };
      query = await UserModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    // 不存在此用户
    if (query.length === 0) {
      res.json({
        code: 604,
        success: false,
        message: '用户不存在'
      })
    } else {
      let userInfo = query[0];
      let obj = {
        code: 200,
        success: true,
        content: {},
        message: '登陆成功'
      };
      // 检查密码
      if (aesDecrypt(userInfo.password) !== req.body.password) {
        obj.code = 601;
        obj.success = false;
        obj.message = '账号或密码错误';
      } else {
        // 账号是否正常
        if (userInfo.status !== 1 || userInfo.flag !== 1) {
          obj.code = 605;
          obj.success = false;
          obj.message = '账号已被冻结';
        } else {
          // 设置token
          let parameter = {
            userId: userInfo.id, // 获取用户信息
            time: new Date() // token是否变更
          };
          // 一天
          let pc = new Date(+new Date() + 60 * 60 * 24 * 1 * 1000).getTime();
          // 三天
          let phone = new Date(+new Date() + 60 * 60 * 24 * 3 * 1000).getTime();
          let expiresTime = userInfo.type === 0 ? phone : pc;
          let tokenId = JWT.sign(parameter, 'day-node-vvv', { expiresIn: expiresTime });
          // 写入mysql
          try {
            let addOrEdit = await TokenModel.getRow({ type: 'userId', data: { userId: userInfo.id } });
            let data = { user_id: userInfo.id };
            if (userInfo.type === 0) {
              data.phone_token = tokenId;
              data.phone_device = this.getClientDevice(req);
              data.phone_ip = this.getClientIp(req);
              data.phone_expire_time = new Date(expiresTime);
            } else {
              data.token = tokenId;
              data.device = this.getClientDevice(req);
              data.ip = this.getClientIp(req);
              data.expire_time = new Date(expiresTime);
            }
            if (addOrEdit.length === 0) {
              await TokenModel.setRow(data);
            } else {
              delete data.user_id;
              await TokenModel.editRow(data, addOrEdit[0].id);
            }
            obj.content.token = tokenId;
          } catch (error) {
            this.exceptionAction(req, res, error);
            return;
          }
        }
      }
      res.json(obj);
    }
  }
}

export default new Token();
