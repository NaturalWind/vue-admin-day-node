import Base from './base';
import query from '../lib/mysql/index';

class User extends Base {
  constructor () {
    super();
  }
  getRow (parameter) {
    let sql;
    switch (parameter.type) {
      case 'account':
        sql = `select * from day_user where 1=1 and account='${parameter.data.account}';`;
        break;
      case 'userInfo':
        sql = `select * from day_user where 1=1 and id=${parameter.data.userId};`;
        break;
    
      default:
        break;
    }
    return sql ? query(sql) : [];
  }
  setRow (parameter) {
    let sql = `insert into day_user set ${super.setFormat(parameter)};`;
    return query(sql);
  }
  editRow (parameter, id) {
    let sql = `update day_user set ${super.setFormat(parameter)} where id=${id};`;
    return query(sql);
  }
}

export default new User();
