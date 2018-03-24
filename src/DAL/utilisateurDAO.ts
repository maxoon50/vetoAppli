let connexion = require('./knexImpl');

import {Utilisateur} from '../BO/utilisateur';
import {DALInterface} from '../interfaces/IDALInterface';
import {Error } from '../Enums/Error';


export class  DAOUser implements DALInterface <Utilisateur>{

    TABLE: string = "utilisateur";

    constructor(){

    }

    ///////////////////////////////////////////////////////////////////////////////////////
    public insertOne : (user: Utilisateur) => Promise<Utilisateur> = (user)=>{

        return new Promise((resolve, reject)=>{
            connexion(this.TABLE)
                .insert({
                    pseudo: user.pseudo,
                    password: user.password,
                    utilisateur_role: user.role
                })
                .returning('id')
                .then((id)=>{
                    resolve(new Utilisateur(user.pseudo, user.password, user.role, id));
                })
                .catch((err)=>{
                    reject(err);
                })
        })

    }


    ///////////////////////////////////////////////////////////////////////////////////////
    public remove : (id: number) => Promise<number> = (id)=>{

        return new Promise((resolve, reject)=>{
            connexion(this.TABLE)
                .where('id', id)
                .del()
                .then((response)=>{
                    resolve(response);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    public update : (user: Utilisateur) => Promise<number> = (user)=>{

        return new Promise((resolve, reject)=>{
            connexion(this.TABLE)
                .where('id', user.id)
                .update({
                    pseudo: user.pseudo,
                    password: user.password,
                    utilisateur_role: user.role
                }).then((nbrLineUpdated)=>{
                    resolve(nbrLineUpdated);
                }).catch((err)=>{
                    reject(err);
                })
        })

    }


    ///////////////////////////////////////////////////////////////////////////////////////
    public getAll : () => Promise<Utilisateur[]> = ()=>{

        return new Promise((resolve,reject)=>{

            connexion(this.TABLE)

                .then((result)=>{
                    var retArr : Utilisateur[] = [];
                    if(result.length){
                        for(var i = 0; i<result.length; i++){
                            retArr.push(new Utilisateur(result[i].pseudo, result[i].password, result[i].utilisateur_role, result[i].id ));
                        }

                    }
                    resolve(retArr);
                })
                .catch((error)=>{
                reject(error);
            })
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    public getById: (id: number) => Promise<Utilisateur> = (id)=>{
        return new Promise((resolve,reject)=>{

            connexion(this.TABLE).where('id', id)

                .then((result)=>{
                    if(result.length){
                        let r = result[0];
                        let user = new Utilisateur(r.pseudo, r.password, r .utilisateur_role,r.id );
                        resolve(user);
                    }
                    reject({error : Error.NotFound})}

                ).catch((error)=>{
                reject(error);
            })
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////
   public getByName : (pseudo: string) => Promise<Utilisateur> = (pPseudo : string)=>{

        return new Promise((resolve,reject)=>{

            connexion(this.TABLE).where('pseudo', pPseudo)

                .then((result)=>{
              if(result.length){
                let r = result[0];
                let user = new Utilisateur(r.pseudo, r.password, r .utilisateur_role,r.id );
                resolve(user);
              }
                reject({error : Error.NotFound})}

                ).catch((error)=>{
                reject(error);
              })
        })
      
    }

};





