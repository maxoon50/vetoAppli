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

routerHome.get('/remove', (req, res)=>{
    let userManager = new UtilisateurBLL();
    let id : number = req.query.id;
    res.setHeader('Content-Type', 'application/json');

    userManager.removeUser(id)
        .then((resp)=>{
            res.send(JSON.stringify({error: null}));
        })
        .catch((err)=>{
            res.send(JSON.stringify({error: err}))
        })

});

// méthode appelée en ajax uniquement
routerHome.post('/modify', (req, res) => {

    let userManager = new UtilisateurBLL();
    res.setHeader('Content-Type', 'application/json');

    userManager.updateUser(req)
        .then((response)=>{
            response['error'] = null;
            res.send(JSON.stringify(response));
        })
        .catch((err)=>{
            res.send(JSON.stringify({error : err}));
        })

})



export = routerHome;