import { Client } from "../BO/Client";
import {ClientDAO} from "../DAL/clientDAO";
import { BusinessError } from "../Errors/BusinessError";
import {MyError} from "../Errors/MyError";

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

    public getByName : (name : string) => Promise<Client> = (name)=> {

        let dao  = new ClientDAO();

        return new Promise((resolve, reject) =>{
            dao.getByName(name)
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

            let errors = new BusinessError();
            this.validateClient(req, errors);

            if(errors.getErreurs().length > 0){
                reject({error: errors.getErreurs()});
            }else {
                let user: Client = new Client(req.body.nom, req.body.prenom, req.body.email);
                dao.insertOne(user)
                    .then((client: Client) => {
                        resolve(client);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }
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
                    reject(MyError.ERR_SQL_DELETE);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    public updateClient : (req) => Promise<object> = (req) => {

        let dao  = new ClientDAO();

        return new Promise((resolve, reject) =>{

                let errors = new BusinessError();
                this.validateClientWithID(req, errors);

                if(errors.getErreurs().length > 0){
                    reject({error: errors.getErreurs()});
                }else{
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
                }
        })

    }


    private validateClientWithID : (req, errors: BusinessError) => void = (req, errors) =>{

        if(req.body.nom == null ||req.body.nom.length < 3 ){
                errors.addErreur(MyError.CONSTR_CLIENT_NOM);
        }
        if(req.body.prenom == null ||req.body.prenom.length < 3 ){
                errors.addErreur(MyError.CONSTR_CLIENT_PRENOM);
        }
        if(req.body.email == null ||!this.validateEmail(req.body.email) ){
                errors.addErreur(MyError.CONSTR_CLIENT_EMAIL);
        }
        if(req.body.id == null || !(req.body.id === parseInt(req.body.id, 10))){
                errors.addErreur(MyError.CONSTR_CLIENT_ID);
        }
    }

    private validateClient: (req, errors: BusinessError) => void = (req, errors) =>{

        if(req.body.nom == null ||req.body.nom.length < 3 ){
            errors.addErreur(MyError.CONSTR_CLIENT_NOM);
        }
        if(req.body.prenom == null ||req.body.prenom.length < 3 ){
            errors.addErreur(MyError.CONSTR_CLIENT_PRENOM);
        }
        if(req.body.email == null ||!this.validateEmail(req.body.email) ){
            errors.addErreur(MyError.CONSTR_CLIENT_EMAIL);
        }
    }

    private validateEmail : (email: string) => boolean = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }



}