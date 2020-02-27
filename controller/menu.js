import Base from './base';
import MenuModel from '../model/menu';

class Menu extends Base {
  constructor () {
    super();
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.item = this.item.bind(this);
    this.all = this.all.bind(this);
  }
  async create (req, res, next) {
    try {
      let data = {
        parent_id: req.body.parentId,
        sort: req.body.sort,
        icon: req.body.icon,
        name: req.body.name,
        path: req.body.path,
        component: req.body.component,
        keep_alive: req.body.keepAlive,
        show_parent_menu: req.body.showParentMenu,
        is_jump: req.body.isJump,
        create_user: req.body.createUser,
        create_time: req.body.createTime
      };
      await MenuModel.setRow(data);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    res.json({
      code: 200,
      success: true,
      message: '创建成功'
    })
  }
  async update (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'id',
        data: {
          id: req.body.id
        }
      };
      query = await MenuModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    if (query.length !== 0) {
      try {
        let data = JSON.parse(JSON.stringify(req.body));
        delete data.id;
        await MenuModel.editRow(this.decamelizeKeys(data), req.body.id);
      } catch (error) {
        this.exceptionAction(req, res, error);
        return;
      }
      res.json({
        code: 200,
        success: true,
        message: '更新成功！'
      })
    } else {
      res.json({
        code: 604,
        success: false,
        message: '更新失败，数据不存在！'
      })
    }
  }
  async delete (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'id',
        data: {
          id: req.params.id
        }
      };
      query = await MenuModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    if (query.length !== 0) {
      try {
        await MenuModel.deleteRow(req.params.id);
      } catch (error) {
        this.exceptionAction(req, res, error);
        return;
      }
      res.json({
        code: 200,
        success: true,
        message: '删除成功！'
      })
    } else {
      res.json({
        code: 604,
        success: false,
        message: '删除失败，数据不存在！'
      })
    }
  }
  async item (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'id',
        data: {
          id: req.params.id
        }
      };
      query = await MenuModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    res.json({
      code: 200,
      success: true,
      content: query[0] ? this.camelizeKeys(query[0]) : {},
      message: '获取成功！'
    })
  }
  async all (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'all',
        data: {}
      };
      query = await MenuModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    res.json({
      code: 200,
      success: true,
      content: this.camelizeKeys(query),
      message: '获取成功！'
    })
  }
}

export default new Menu();
