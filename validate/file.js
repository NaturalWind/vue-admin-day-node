import Base from './base';

class File extends Base {
  constructor () {
    super();
  }
  upload (req, res, next) {
    next();
  }
  delete (req, res, next) {
    let arr = [
      { label: 'id', value: req.params.id, rules: ['notNull'] }
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
  page (req, res, next) {
    let arr = [
      { label: 'currentPage', value: req.params.currentPage, rules: ['notNull', 'isNumber'] },
      { label: 'pageSize', value: req.params.pageSize, rules: ['notNull', 'isNumber'] }
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
  all (req, res, next) {
    next();
  }
}

export default new File();
