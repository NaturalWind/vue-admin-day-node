import Base from './base';

class User extends Base {
  constructor () {
    super();
  }
  registered (req, res, next) {
    let arr = [
      { label: '账号', value: req.body.account, rules: ['accOrPwd'] },
      { label: '密码', value: req.body.password, rules: ['accOrPwd'] },
      { label: '账号类型', value: req.body.type, rules: ['notNull'] }
    ];
    let result = super.check(arr);
    if (!result.success) {
      res.json({
        code: 602,
        success: false,
        message: result.message
      })
      return;
    }
    next();
  }
  changePwd (req, res, next) {
    let arr = [
      { label: '账号', value: req.body.account, rules: ['accOrPwd'] },
      { label: '密码', value: req.body.password, rules: ['accOrPwd'] },
      { label: '新密码', value: req.body.newPassword, rules: ['accOrPwd'] }
    ];
    let result = super.check(arr);
    if (!result.success) {
      res.json({
        code: 602,
        success: false,
        message: result.message
      })
      return;
    }
    next();
  }
}

export default new User();
