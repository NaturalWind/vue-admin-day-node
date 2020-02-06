import Base from './base';
import { aesEncrypt, aesDecrypt } from '../lib/util/util';
import UserModel from '../model/user';

class User extends Base {
  constructor () {
    super();
    this.registered = this.registered.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.changePwd = this.changePwd.bind(this);
  }
  async registered (req, res, next) {
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
    // 不存在，创建账号
    if (query.length === 0) {
      try {
        let data = {
          name: req.body.account,
          account: req.body.account,
          password: aesEncrypt(req.body.password),
          type: req.body.type,
          create_time: new Date()
        };
        await UserModel.setRow(data);
      } catch (error) {
        this.exceptionAction(req, res, error);
        return;
      }
      res.json({
        code: 200,
        success: true,
        message: req.body.type === 2 ? '创建成功' : '注册成功'
      })
    } else {
      res.json({
        code: 603,
        success: false,
        message: '用户已存在'
      })
    }
  }
  async userInfo (req, res, next) {
    let content = null;
    // 查询mysql
    content = await this.getUserInfo(req);
    if (content.code !== 200 && content.code !== 601) {
      this.exceptionAction(req, res, content.content);
      return;
    }
    res.json({
      code: content.code,
      success: content.success,
      content: content.success ? content.content[0] : content.content,
      message: content.message
    })
  }
  async changePwd (req, res, next) {
    // 获取用户信息
    let userInfo = await this.getUserInfo(req);
    if (userInfo.code !== 200 && userInfo.code !== 601) {
      this.exceptionAction(req, res, userInfo.content);
      return;
    }
    // 判断是否正确
    if (!userInfo.success) {
      res.json({
        code: userInfo.code,
        success: userInfo.success,
        content: userInfo.content,
        message: userInfo.message
      })
    } else {
      let obj = {
        code: 200,
        success: true,
        message: '修改成功'
      };
      // 判断旧密码是否正确
      if (req.body.password === aesDecrypt(userInfo.content[0].password)) {
        try {
          await UserModel.editRow({ password: aesEncrypt(req.body.newPassword) }, userInfo.content[0].id);
        } catch (error) {
          this.exceptionAction(req, res, error);
          return;
        }
      } else {
        obj.code = 602;
        obj.success = false;
        obj.message = '密码错误';
      }
      res.json(obj);
    }
  }
}

export default new User();
