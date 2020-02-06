import Base from './base';

class Token extends Base {
  constructor () {
    super();
  }
  verify (req, res, next) {
    let arr = [
      { label: '账号', value: req.body.account, rules: ['accOrPwd'] },
      { label: '密码', value: req.body.password, rules: ['accOrPwd'] }
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

export default new Token();
