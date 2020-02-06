import Base from './base';
import query from '../lib/mysql/index';

class Token extends Base {
  constructor () {
    super();
  }
  getRow (parameter) {
    let sql;
    switch (parameter.type) {
      case 'userId':
        sql = `select * from day_token where 1=1 and user_id=${parameter.data.userId};`;
        break;
    
      default:
        break;
    }
    return sql ? query(sql) : [];
  }
  setRow (parameter) {
    let sql = `insert into day_token set ${super.setFormat(parameter)};`;
    return query(sql);
  }
  editRow (parameter, id) {
    let sql = `update day_token set ${super.setFormat(parameter)} where id=${id};`;
    return query(sql);
  }
}

export default new Token();
