import Base from './base';
import FileModel from '../model/file';
import JWT from 'jsonwebtoken';
import { switchTime } from '../lib/util/util';
import fs from 'fs';
import path from 'path';

class File extends Base {
  constructor () {
    super();
    this.upload = this.upload.bind(this);
    this.delete = this.delete.bind(this);
    this.page = this.page.bind(this);
    this.all = this.all.bind(this);
  }
  async upload (req, res, next) {
    try {
      let userId = null;
      JWT.verify(req.headers.authorization, 'day-node-vvv', (error, decoded) => {
        userId = decoded.userId || null;
      })
      let arr = req.file.originalname.split('.');
      let fileData = {
        name: req.file.filename,
        name_old: arr[0],
        type: req.file.mimetype,
        encoding: req.file.encoding,
        path: req.file.path.replace('public/', ''),
        suffix: arr[1],
        size: req.file.size,
        create_user: userId,
        create_time: switchTime(new Date(), 'YYYY-MM-DD hh:mm:ss')
      };
      fs.readFile(`public/${fileData.path}`, (err, data) => {
        if (err) {
          res.json({
            code: 604,
            success: false,
            content: err,
            message: '上传失败！'
          })
          return;
        }
        let fileName = `../public/file/${fileData.name}.${fileData.suffix}`;
        fs.writeFile(path.join(__dirname, fileName), data, async (err) => {
          if (err) {
            res.json({
              code: 604,
              success: false,
              content: err,
              message: '上传失败！'
            })
            return;
          }
          await FileModel.setRow(fileData);
          res.json({
            code: 200,
            success: true,
            content: {
              name: `${fileData.name_old}.${fileData.suffix}`,
              url: `file/${fileData.name}.${fileData.suffix}`
            },
            message: '上传成功！'
          })
        });
      });
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
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
      query = await FileModel.getRow(obj);
    } catch (error) {
      this.exceptionAction(req, res, error);
      return;
    }
    if (query.length !== 0) {
      try {
        await FileModel.deleteRow(req.params.id);
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
  async page (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'page',
        data: req.params
      };
      query = await FileModel.getRow(obj);
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
  async all (req, res, next) {
    let query = [];
    try {
      let obj = {
        type: 'all',
        data: {}
      };
      query = await FileModel.getRow(obj);
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

export default new File();
