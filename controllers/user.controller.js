const { postLogin, postRefresh } = require("../services/auth.service");
const { createSessionCookie, removeSessionCookie } = require("../utilities/cookie.utilities");

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    postLogin(username, password)
        .then((data) => {
            const token = data.access;
            const refresh = data.refresh;
            createSessionCookie(res, token, refresh);
            res.send({
                message: "Inicio de sesión exitoso",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send({
                message: "Credenciales inválidas",
            });
        });
}
exports.refreshToken = (req, res) => {
    const refreshCookie = req.cookies.refresh;
    if (!refreshCookie) {
        return res.status(401).send({
            message: "No refresh token found",
        });
    }
    console.log("Refresh token: ", refreshCookie);
    postRefresh(refreshCookie)
        .then((data) => {
            const token = data.access;
            console.log("New token: ", token);
            createSessionCookie(res, token, null);
            res.send({
                message: "Token refreshed",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(401).send({
                message: "Invalid refresh token",
            });
        });
}
exports.logout = (req, res) => {
    removeSessionCookie(res);
    res.send({
        message: "Logout successful",
    });
}