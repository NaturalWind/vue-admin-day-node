import Base from './base';

class Menu extends Base {
  constructor () {
    super();
  }
  create (req, res, next) {
    let arr = [
      { label: '父id', value: req.body.parentId, rules: ['notNull'] },
      { label: '排序', value: req.body.sort, rules: ['notNull'] },
      { label: '名称', value: req.body.name, rules: ['notNull'] },
      { label: '路径', value: req.body.path, rules: ['notNull'] },
      { label: '组件', value: req.body.component, rules: ['notNull'] }
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
  update (req, res, next) {
    let arr = [
      { label: 'id', value: req.body.id, rules: ['notNull'] }
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
  item (req, res, next) {
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
  all (req, res, next) {
    next();
  }
}

export default new Menu();
