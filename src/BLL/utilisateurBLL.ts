import {Utilisateur} from "../BO/utilisateur";
import {DAOUser} from '../DAL/utilisateurDAO';
import {Error } from '../Enums/Error';

export class UtilisateurBLL {


     public checkLogin = (pPseudo : string, pPassword : string)=>{

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


     public getAll : () => Promise<Utilisateur[]> = () => {

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


     public getById : (id : number) => Promise<Utilisateur> = (id)=> {

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

    public addUser : (user: Utilisateur) => Promise<Utilisateur> = (user) => {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.insertOne(user)
                .then((user : Utilisateur)=>{
                    resolve(user);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    public removeUser : (id: number) => Promise<number> = (id) =>{

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.remove(id)
                .then((lineRemoved : number)=>{
                    resolve(lineRemoved);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    public updateUser : (user: Utilisateur) => Promise<number> = (user) => {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.update(user)
                .then((nbrLineChanged: number)=>{
                    resolve(nbrLineChanged);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

}