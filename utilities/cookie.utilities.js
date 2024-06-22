const createSessionCookie = (res, token) => {
    res.cookie('session', token, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
}

const removeSessionCookie = (res) => {
    res.clearCookie('session');
}

export { createSessionCookie, removeSessionCookie };