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
  setFuzzyFormat (parameter) {
    let str = '';
    for (const key in parameter) {
      if (parameter.hasOwnProperty(key)) {
        const item = parameter[key];
        if (key !== 'currentPage' && key !== 'pageSize') {
          str += `${key} like %${mysql.escape(item)}% and `;
        }
      }
    }
    return str.length !== 0 ? str.substring(0, str.length - 5) : '';
  }
}

export default Base;
