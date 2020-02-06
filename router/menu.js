import express from 'express';
import validate from '../validate/menu';
import menu from '../controller/menu';
const router = express.Router();

router.post('/create', validate.create, menu.create);

router.put('/update', validate.update, menu.update);

router.delete('/delete/:id', validate.delete, menu.delete);

router.get('/item/:id', validate.item, menu.item);

router.get('/all', validate.all, menu.all);

export default router;
