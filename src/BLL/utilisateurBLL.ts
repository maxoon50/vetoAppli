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

    public addUser : (req ) => Promise<Utilisateur> = (req) => {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{

            if(this.validateUser(req)){

                let user : Utilisateur = new Utilisateur(req.body.pseudo,req.body.password, req.body.role);
                dao.insertOne(user)
                    .then((user : Utilisateur)=>{
                        resolve(user);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            }else{
                reject("erreur, merci de vérifier que les champs renseigné soient corrects");
            }
        })

    }

    public removeUser : (id: number) => Promise<number> = (id) =>{

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{
            dao.remove(id)
                .then((lineRemoved : number)=>{
                    if(lineRemoved == 1){
                        resolve(lineRemoved);
                    }
                    reject("erreur lors de la suppression du user");
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    public updateUser : (req) => Promise<object> = (req) => {

        let dao  = new DAOUser();

        return new Promise((resolve, reject) =>{

            if(this.validateUserWithId(req)) {

                let user: Utilisateur = new Utilisateur(req.body.pseudo, req.body.password, req.body.role, req.body.id);

                dao.update(user)
                    .then((nbrLineChanged: number) => {
                        resolve({
                            nbrLineChanged,
                            user
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }else{
                reject("erreur, merci de vérifier que les champs renseignés soient corrects");
            }
        })

    }

    ///////////////////////////////////UTILS////////////////////////////////////////////////

    private validateUserWithId : (req) => boolean = (req) =>{

         try{
             if(req.body.pseudo != null && req.body.pseudo.length > 2
                 && req.body.password != null && req.body.password.length > 2
                 && req.body.role != null && req.body.role.length == 3
                 && req.body.id != null && !isNaN(parseInt(req.body.id))
             ){
                 return true;
             }
         }catch(e){
             return false;
         }

         return false;
    }

    private validateUser : (req) => boolean = (req) =>{

        try{
            if(req.body.pseudo != null && req.body.pseudo.length > 2
                && req.body.password != null && req.body.password.length > 2
                && req.body.role != null && req.body.role.length == 3
            ){
                return true;
            }
        }catch(e){
            return false;
        }

        return false;
    }

}