import mysql from 'mysql';

class Base {
  constructor () {}
  setFormat (parameter) {
    let str = '';
    for (const key in parameter) {
      if (parameter.hasOwnProperty(key)) {
        const item = parameter[key];
        str += `${key}=${mysql.escape(item)},`;
      }
    }
    return str.length !== 0 ? str.substring(0, str.length - 1) : '';
  }
}

export default Base;
