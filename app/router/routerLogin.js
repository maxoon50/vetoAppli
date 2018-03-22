"use strict";
const express = require('express');
const routerLogin = express.Router();
const Error_1 = require("../Enums/Error");
const utilisateurBLL_1 = require("../BLL/utilisateurBLL");
let noMoreLogin = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    }
    else {
        next();
    }
};
routerLogin.route('/login')
    .get(noMoreLogin, (req, res) => {
    res.render("login.ejs", { user: false });
})
    .post((req, res) => {
    utilisateurBLL_1.UtilisateurBLL.checkLogin(req.body.pseudo, req.body.password)
        .then((response) => {
        req.session.user = response;
        res.redirect('/home');
    })
        .catch((err) => {
        let typeError = err.error && err.error == Error_1.Error.NotFound ? "Erreur login / mot de passe incorrect(s)" : "Un problème est survenu, veuillez contacter l'administrateur";
        var user = {
            nom: req.body.nom,
            password: req.body.password,
        };
        res.render("login.ejs", { user: user, error: "Erreur login / mot de passe incorrect(s)" });
    });
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