"use strict";
const express = require('express');
const routerHome = express.Router();
const clientBLL_1 = require("../BLL/clientBLL");
routerHome.get('/', (req, res) => {
    res.render("client.ejs");
});
routerHome.get('/get-clients/:nom', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.getAllByName(req.params.nom)
        .then((listeClients) => {
        res.send(JSON.stringify({ clients: listeClients, error: null }));
    })
        .catch((error) => {
        console.log(error);
    });
});
routerHome.get('/get-client/:id', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.getById(req.params.id)
        .then((client) => {
        res.render('clientDetails.ejs', { client, error: null });
    })
        .catch((error) => {
        console.log(error);
    });
});
module.exports = routerHome;
//# sourceMappingURL=routerClients.js.map