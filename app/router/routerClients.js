"use strict";
const express = require('express');
const routerClient = express.Router();
const clientBLL_1 = require("../BLL/clientBLL");
routerClient.get('/', (req, res) => {
    res.render("client.ejs", { errors: null });
});
routerClient.get('/get-clients/:nom', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.getAllByName(req.params.nom)
        .then((listeClients) => {
        res.send(JSON.stringify({ clients: listeClients, errors: null }));
    })
        .catch((error) => {
        console.log(error);
    });
});
routerClient.get('/get-client/:id', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.getById(req.params.id)
        .then((client) => {
        res.render('clientDetails.ejs', { client, errors: null });
    })
        .catch((error) => {
        console.log(error);
    });
});
routerClient.post('/add', (req, res) => {
    let clientManager = new clientBLL_1.ClientBLL();
    clientManager.addClient(req)
        .then((client) => {
        res.render('clientDetails.ejs', { client, errors: null });
    })
        .catch((error) => {
        res.render("client.ejs", { errors: error.error });
    });
});
module.exports = routerClient;
//# sourceMappingURL=routerClients.js.map