import {Utilisateur} from "../BO/utilisateur";

let Dao = require('../DAL/utilisateurDAO');
import {DAOUser} from '../DAL/utilisateurDAO';
import {Error } from '../Enums/Error';

export class UtilisateurBLL {


    static checkLogin = (pPseudo : string, pPassword : string)=>{

        let dao  = new DAOUser();

        return new Promise((resolve, reject)=>{
            dao.getByName(pPseudo)
                .then((user)=>{
                if(user.password == pPassword){
                    resolve(user);
                }
                reject({error:Error.NotFound});
                })
                .catch((error)=>{
                reject(error);
            })
        })
    }


    static getAll : () => Promise<Utilisateur[]> = () => {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.getAll()
                .then((users)=>{
                    resolve(users);
                })
                 .catch((error)=>{
                    reject(error);
                 })
        })

    }


    static getById : (id : number) => Promise<Utilisateur> = (id)=> {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.getById(id)
                .then((user : Utilisateur)=>{
                    resolve(user);
                })
                .catch((error)=>{
                    reject(error);
                })
        })

    }

}