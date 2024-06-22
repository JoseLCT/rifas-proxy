import { Router } from 'express';
import { createOrder } from '../controllers/checkout.controller.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/create-order', bodyParser.json(), createOrder);

export default router;