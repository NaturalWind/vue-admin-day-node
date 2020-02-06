import validate from '../lib/util/validate';

class Base {
  constructor () {}
  check (parameter) {
    for (let i = 0; i < parameter.length; i++) {
      let item = parameter[i];
      let res = validate(item);
      if (!res.success) {
        return res;
      }
    }
    return { success: true, message: '' };
  }
}

export default Base;
