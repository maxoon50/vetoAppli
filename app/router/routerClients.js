"use strict";
const express = require('express');
const routerHome = express.Router();
routerHome.get('/', (req, res) => {
    res.render("client.ejs");
});
module.exports = routerHome;
//# sourceMappingURL=routerClients.js.map