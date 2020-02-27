import express from 'express';
import validate from '../validate/user';
import user from '../controller/user';
const router = express.Router();

router.post('/registered', validate.registered, user.registered);

router.get('/info', user.userInfo);

router.post('/pwd', validate.changePwd, user.changePwd);

router.put('/update', validate.update, user.update);

export default router;
