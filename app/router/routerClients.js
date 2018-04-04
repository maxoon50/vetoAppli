"use strict";
const express = require('express');
const routerHome = express.Router();
const clientBLL_1 = require("../BLL/clientBLL");
routerHome.get('/', (req, res) => {
    res.render("client.ejs");
});
routerHome.get('/get-client/:nom', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.getByName(req.params.nom)
        .then((response) => {
        console.log(response);
    })
        .catch((error) => {
        console.log(error);
    });
});
module.exports = routerHome;
//# sourceMappingURL=routerClients.js.map