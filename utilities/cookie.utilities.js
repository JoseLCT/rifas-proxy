const createSessionCookie = (res, token, refresh) => {
    res.cookie('session', token, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
    if (refresh) {
        res.cookie('refresh', refresh, {
            maxAge: 1000 * 60 * 24,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
    }
}
const removeSessionCookie = (res) => {
    res.clearCookie('session');
    res.clearCookie('refresh');
}

module.exports = { createSessionCookie, removeSessionCookie };