import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/user.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';

dotenv.config();
const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000'
    ],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
    ]
}));

app.use('/auth', authRoutes);
app.use('/checkout', checkoutRoutes);

const onProxyReq = async function (proxyReq, req, res) {
    const token = req.cookies.session;
    if (token) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
};

app.use(
    '/proxy',
    createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return path.replace('/proxy', '');
        },
        on: {
            proxyReq: onProxyReq
        }
    }),
);

app.listen(4000);
