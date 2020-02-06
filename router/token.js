import express from 'express';
import validate from '../validate/token';
import token from '../controller/token';
const router = express.Router();

router.post('/token', validate.verify, token.setToken);

export default router;
