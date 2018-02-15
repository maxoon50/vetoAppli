"use strict";
const express = require('express');
const routerLogin = express.Router();
let noMoreLogin = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    }
    else {
        next();
    }
};
routerLogin.get('/', noMoreLogin, (req, res) => {
    res.redirect('/login');
});
routerLogin.route('/login')
    .get(noMoreLogin, (req, res) => {
    res.render("login.ejs", { user: false });
});
routerLogin.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.session.user = null;
    }
    res.redirect('/');
});
module.exports = routerLogin;
//# sourceMappingURL=routerLogin.js.map