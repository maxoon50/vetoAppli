import { Client } from "../BO/Client";
import {ClientDAO} from "../DAL/clientDAO";


export class ClientBLL {

    constructor(){}


    public getAll : () => Promise<Client[]> = () => {

        let dao  = new ClientDAO();

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


    public getById : (id : number) => Promise<Client> = (id)=> {

        let dao  = new ClientDAO();

        return new Promise((resolve, reject) =>{
            dao.getById(id)
                .then((client : Client)=>{
                    resolve(client);
                })
                .catch((error)=>{
                    reject(error);
                })
        })

    }

    public addClient : (req ) => Promise<Client> = (req) => {

        let dao  = new ClientDAO();

        return new Promise((resolve, reject) =>{

                let user : Client = new Client(req.body.nom,req.body.prenom, req.body.email);
                dao.insertOne(user)
                    .then((client : Client)=>{
                        resolve(user);
                    })
                    .catch((error)=>{
                        reject(error);
                    })

        })

    }

    public removeClient : (id: number) => Promise<number> = (id) =>{

        let dao  = new ClientDAO();

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

    public updateClient : (req) => Promise<object> = (req) => {

        let dao  = new ClientDAO();

        return new Promise((resolve, reject) =>{

                let client: Client = new Client(req.body.nom, req.body.prenom, req.body.email, req.body.id);

                dao.update(client)
                    .then((nbrLineChanged: number) => {
                        resolve({
                            nbrLineChanged,
                            client
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    })

        })

    }




}