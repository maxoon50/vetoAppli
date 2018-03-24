"use strict";
const express = require('express');
const routerHome = express.Router();
routerHome.get('/', (req, res) => {
    res.render("users.ejs");
});
module.exports = routerHome;
//# sourceMappingURL=routerUser.js.map