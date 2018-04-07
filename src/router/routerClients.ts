const express = require('express');
const routerHome = express.Router();
import { ClientBLL } from '../BLL/clientBLL';


routerHome.get('/', (req, res)=>{
    res.render("client.ejs");
});

routerHome.get('/get-clients/:nom', (req, res)=>{

    let clientManager = new ClientBLL();

    clientManager.getAllByName(req.params.nom)
        .then((listeClients)=>{
            res.send(JSON.stringify({clients: listeClients,error: null}));
        })
        .catch((error) =>{
            console.log(error)
        })
})



export = routerHome;