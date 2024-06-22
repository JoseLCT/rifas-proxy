import { postLogin } from "../services/auth.service.js";
import { createSessionCookie, removeSessionCookie } from "../utilities/cookie.utilities.js";

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    postLogin(username, password)
        .then((data) => {
            const token = data.access_token;
            createSessionCookie(res, token);
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

const logout = (req, res) => {
    removeSessionCookie(res);
    res.send({
        message: "Cierre de sesión exitoso",
    });
}

export { login, logout };