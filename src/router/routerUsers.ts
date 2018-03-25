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

routerHome.post('/modify', (req, res) => {
    let userManager = new UtilisateurBLL();

    userManager.updateUser(req)
        .then((response)=>{
            // a voir pour la suite--------------------------
        console.log(response);
        })
        .catch((err)=>{
        console.log(err);
        })

})



export = routerHome;