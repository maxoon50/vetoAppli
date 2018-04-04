const express = require('express');
const routerHome = express.Router();
import { ClientBLL } from '../BLL/clientBLL';


routerHome.get('/', (req, res)=>{
    res.render("client.ejs");
});

routerHome.get('/get-client/:nom', (req, res)=>{

    let clientManager = new ClientBLL();

    clientManager.getByName(req.params.nom)
        .then((response)=>{
            console.log(response);
        })
        .catch((error) =>{
            console.log(error)
        })
})



export = routerHome;