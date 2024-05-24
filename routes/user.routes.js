module.exports = (app) => {
    const bodyParser = require('body-parser');
    const userController = require('../controllers/user.controller');
    
    let router = require('express').Router();

    router.post("/login", bodyParser.json(), userController.login);
    router.post("/refresh", bodyParser.json(), userController.refreshToken);
    router.post("/logout", userController.logout);
    
    app.use("/auth", router);
}