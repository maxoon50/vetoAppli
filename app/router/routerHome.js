"use strict";
const express = require('express');
const routerHome = express.Router();
routerHome.get('/', (req, res) => {
    res.render("home.ejs");
});
module.exports = routerHome;
//# sourceMappingURL=routerHome.js.map