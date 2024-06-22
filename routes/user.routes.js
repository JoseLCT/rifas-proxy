import { Router } from 'express';
import { login, logout } from '../controllers/user.controller.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/login', bodyParser.json(), login);
router.post('/logout', logout);

export default router;