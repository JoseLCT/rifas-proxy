const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const API_URL = "http://127.0.0.1:8000/api/";

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173'
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

require('./routes/user.routes')(app);
const onProxyReq = async function (proxyReq, req, res) {
    const token = req.cookies.session;
    console.log("Token: ", token);
    if (token) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
};
app.use(
    '/web-proxy',
    createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return path.replace('/web-proxy', '');
        },
        on: {
            proxyReq: onProxyReq
        }
    }),
);

app.listen(3000);
