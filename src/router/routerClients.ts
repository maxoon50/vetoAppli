const express = require('express');
const routerHome = express.Router();
import {UtilisateurBLL} from '../BLL/utilisateurBLL';


routerHome.get('/', (req, res)=>{
    res.render("client.ejs");
});



export = routerHome;