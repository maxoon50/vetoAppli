let connexion = require('./knexImpl');

import {Utilisateur} from '../BO/utilisateur';
import {DALInterface} from '../interfaces/IDALInterface';
import {Error } from '../Enums/Error';


export class  DAOUser implements DALInterface <Utilisateur>{

    constructor(){

    }

    ///////////////////////////////////////////////////////////////////////////////////////
    insertOne : (Utilisateur: Utilisateur) => any = ()=>{
        return null;
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    remove : (id: number) => any = ()=>{
        return null;
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    update : (Utilisateur: Utilisateur) => any = ()=>{
        return null;
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    getAll : () => Promise<Utilisateur[]> = ()=>{

        return new Promise((resolve,reject)=>{

            connexion('utilisateur')

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
    getById: (id: number) => Promise<Utilisateur> = (id)=>{
        return new Promise((resolve,reject)=>{

            connexion('utilisateur').where('id', id)

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
   getByName : (Utilisateur: string) => Promise<Utilisateur> = (pPseudo : string)=>{

        return new Promise((resolve,reject)=>{

            connexion('utilisateur').where('pseudo', pPseudo)

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





