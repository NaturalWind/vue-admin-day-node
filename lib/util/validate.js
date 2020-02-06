let type = {
  validatenull: function(val) {
    if (typeof val === 'boolean') {
      return false;
    }
    if (typeof val === 'number') {
      return false;
    }
    if (val instanceof Array) {
      if (val.length === 0) {
        return true;
      }
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') {
        return true;
      }
    } else {
      if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') {
        return true;
      }
      return false;
    }
    return false;
  },
  isMobile: function(val) {
    return /^1[0-9]{10}$/.test(val);
  },
  isPhone: function(val) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(val);
  },
  isEmail: function(val) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val);
  },
  isChinese: function(val) {
    return /\S*[\u4e00-\u9fa5]+\S*/.test(val);
  },
  accOrPwd: function(val) {
    if (!this.validatenull(val) && !this.isChinese(val)) {
      return true;
    }
    return false;
  },
  notNull: function(val) {
    if (!this.validatenull(val)) {
      return true;
    }
    return false;
  }
};

let tip = {
  isMobile: 'xx不是手机号码',
  isPhone: 'xx不是电话号码',
  isEmail: 'xx不是邮箱地址',
  isChinese: 'xx不是中文',
  accOrPwd: 'xx不能为空且不能为中文',
  notNull: 'xx不能为空'
};

let validate = (parameter) => {
  let res = {
    success: true,
    message: ''
  };
  for (let i = 0; i < parameter.rules.length; i++) {
    let item = parameter.rules[i];
    if (!type[item](parameter.value)) {
      res.success = false;
      res.message = tip[item].replace('xx', parameter.label);
      break;
    }
  }
  return res;
};

export default validate;
