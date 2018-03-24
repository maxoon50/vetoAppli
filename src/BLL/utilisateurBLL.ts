import {Utilisateur} from "../BO/utilisateur";
import {DAOUser} from '../DAL/utilisateurDAO';
import {Error } from '../Enums/Error';

export class UtilisateurBLL {


     checkLogin = (pPseudo : string, pPassword : string)=>{

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


     getAll : () => Promise<Utilisateur[]> = () => {

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


     getById : (id : number) => Promise<Utilisateur> = (id)=> {

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