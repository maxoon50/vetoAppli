import {Utilisateur} from "../BO/utilisateur";

const express = require('express');
const routerHome = express.Router();
import {UtilisateurBLL} from '../BLL/utilisateurBLL'


routerHome.get('/', (req, res)=>{
    let userManager = new UtilisateurBLL();
    let userList, errors;
    userManager.getAll()
        .then((users)=>{
            userList = users;
            res.render("users.ejs", {users: userList, error: null});
        })
        .catch((err)=>{
            res.render("users.ejs", { users: null, error: err});
        })
    ;


});



export = routerHome;