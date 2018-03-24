"use strict";
const express = require('express');
const routerHome = express.Router();
const utilisateurBLL_1 = require("../BLL/utilisateurBLL");
routerHome.get('/', (req, res) => {
    let userManager = new utilisateurBLL_1.UtilisateurBLL();
    let userList, errors;
    userManager.getAll()
        .then((users) => {
        userList = users;
        res.render("users.ejs", { users: userList, error: null });
    })
        .catch((err) => {
        res.render("users.ejs", { users: null, error: err });
    });
});
routerHome.get('/remove', (req, res) => {
    let userManager = new utilisateurBLL_1.UtilisateurBLL();
    let id = req.query.id;
    res.setHeader('Content-Type', 'application/json');
    userManager.removeUser(id)
        .then((resp) => {
        res.send(JSON.stringify({ error: null }));
    })
        .catch((err) => {
        res.send(JSON.stringify({ error: err }));
    });
});
module.exports = routerHome;
//# sourceMappingURL=routerUsers.js.map