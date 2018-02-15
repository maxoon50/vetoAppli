let connexion = require('./knexImpl');

import {Utilisateur} from '../BO/utilisateur';
import {DALInterface} from '../interfaces/IDALInterface';



let DAOUser : DALInterface <Utilisateur>= {
    insertOne:  (u : Utilisateur)=>{
        return 5;
    },
//     remove:  ()=>{

//     },
//    update: (u : Utilisateur)=>{

//     },
//     getAll:  ( )=>{

//     },
//     getById: ( pId : number)=>{

//     }

};




export = DAOUser;
