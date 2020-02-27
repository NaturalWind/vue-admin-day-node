import Base from './base';
import query from '../lib/mysql/index';

class File extends Base {
  constructor () {
    super();
  }
  getRow (parameter) {
    let sql;
    switch (parameter.type) {
      case 'id':
        sql = `select * from day_file where 1=1 and id='${parameter.data.id}';`;
        break;
      case 'all':
        sql = `select * from day_file;`;
        break;
      case 'page':
        sql = `select * from day_file where 1=1 and ${super.setFuzzyFormat(parameter.data)} 
              order by id desc 
              limit (${parameter.data.currentPage} - 1) * ${parameter.data.pageSize}, ${parameter.data.pageSize};`;
        break;
    
      default:
        break;
    }
    return sql ? query(sql) : [];
  }
  setRow (parameter) {
    let sql = `insert into day_file set ${super.setFormat(parameter)};`;
    return query(sql);
  }
  editRow (parameter, id) {
    let sql = `update day_file set ${super.setFormat(parameter)} where id=${id};`;
    return query(sql);
  }
  deleteRow (id) {
    let sql = `delete from day_file where id=${id};`;
    return query(sql);
  }
}

export default new File();
