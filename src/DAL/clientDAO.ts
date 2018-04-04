import {Error} from "../Enums/Error";

let connexion = require('./knexImpl');


import { Client } from '../BO/client';
import {DALInterface} from '../interfaces/IDALInterface';
import { MyError } from "../Errors/MyError";


export class ClientDAO implements DALInterface<Client>{

    TABLE: string = "clients";

    constructor(){}


    ///////////////////////////////////////////////////////////////////////////////////////

    public insertOne : (client: Client) => Promise<Client> = (client)=>{

        return new Promise((resolve, reject)=>{
            connexion(this.TABLE)
                .insert({
                    nom: client.nom,
                    prenom: client.prenom,
                    email: client.email
                })
                .returning('id')
                .then((id)=>{
                    resolve(new Client(client.nom, client.prenom, client.email, id));
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
    public update : (client: Client) => Promise<number> = (client)=>{

        return new Promise((resolve, reject)=>{
            connexion(this.TABLE)
                .where('id', client.id)
                .update({
                    nom: client.nom,
                    prenom: client.prenom,
                    email: client.email
                }).then((nbrLineUpdated)=>{
                    resolve(nbrLineUpdated);
                }).catch((err)=>{
                    reject(err);
            })
        })

    }


    ///////////////////////////////////////////////////////////////////////////////////////

    public getAll : () => Promise<Client[]> = ()=>{

        return new Promise((resolve,reject)=>{

            connexion(this.TABLE)

                .then((result)=>{
                    var retArr : Client[] = [];
                    if(result.length){
                        for(var i = 0; i<result.length; i++){
                            retArr.push(new Client(result[i].nom, result[i].prenom, result[i].email, result[i].id ));
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

    public getById: (id: number) => Promise<Client> = (id)=>{
        return new Promise((resolve,reject)=>{

            connexion(this.TABLE).where('id', id)

                .then((result)=>{
                    if(result.length){
                        let r = result[0];
                        let client = new Client(r.nom, r.prenom, r .email,r.id );
                        resolve(client);
                    }
                    reject({error : MyError.CLIENT_NOT_FOUND})
                })
                .catch((error)=>{
                reject(error);
            })
        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////

    public getByName : (nom: string) => Promise<Client> = (nom : string)=>{

        return new Promise((resolve,reject)=>{

            connexion(this.TABLE).where('nom', nom)

                .then((result)=>{
                    if(result.length){
                        let r = result[0];
                        let client = new Client(r.nom, r.prenom, r.email ,r.id_client );
                        resolve(client);
                    }
                    reject({error : MyError.CLIENT_NOT_FOUND});
                })
                .catch((error)=>{
                reject(error);
            })
        })

    }


}