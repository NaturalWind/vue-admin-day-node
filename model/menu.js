import Base from './base';
import query from '../lib/mysql/index';

class Menu extends Base {
  constructor () {
    super();
  }
  getRow (parameter) {
    let sql;
    switch (parameter.type) {
      case 'id':
        sql = `select * from day_menu where 1=1 and id='${parameter.data.id}';`;
        break;
      case 'all':
        sql = `select * from day_menu;`;
        break;
    
      default:
        break;
    }
    return sql ? query(sql) : [];
  }
  setRow (parameter) {
    let sql = `insert into day_menu set ${super.setFormat(parameter)};`;
    return query(sql);
  }
  editRow (parameter, id) {
    let sql = `update day_menu set ${super.setFormat(parameter)} where id=${id};`;
    return query(sql);
  }
  deleteRow (id) {
    let sql = `delete from day_menu where id=${id};`;
    return query(sql);
  }
}

export default new Menu();
