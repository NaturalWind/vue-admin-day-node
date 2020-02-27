import express from 'express';
import validate from '../validate/file';
import file from '../controller/file';
const router = express.Router();

const multer = require('multer');
const upload = multer({
  dest: './public/file/' // 上传文件存放路径
});
const singleMidle = upload.single('file');

router.post('/upload', validate.upload, singleMidle, file.upload);

router.delete('/delete/:id', validate.delete, file.delete);

router.get('/page', validate.page, file.page);

router.get('/all', validate.all, file.all);

export default router;
