"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let connexion = require('./knexImpl');
const client_1 = require("../BO/client");
const MyError_1 = require("../Errors/MyError");
class ClientDAO {
    constructor() {
        this.TABLE = "clients";
        this.insertOne = (client) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .insert({
                    nom: client.nom,
                    prenom: client.prenom,
                    email: client.email
                })
                    .returning('id')
                    .then((id) => {
                    resolve(new client_1.Client(client.nom, client.prenom, client.email, id));
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        };
        this.remove = (id) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .where('id', id)
                    .del()
                    .then((response) => {
                    resolve(response);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        };
        this.update = (client) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .where('id', client.id)
                    .update({
                    nom: client.nom,
                    prenom: client.prenom,
                    email: client.email
                }).then((nbrLineUpdated) => {
                    resolve(nbrLineUpdated);
                }).catch((err) => {
                    reject(err);
                });
            });
        };
        this.getAll = () => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .then((result) => {
                    var retArr = [];
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            retArr.push(new client_1.Client(result[i].nom, result[i].prenom, result[i].email, result[i].id));
                        }
                    }
                    resolve(retArr);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.getById = (id) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE).where('id', id)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let client = new client_1.Client(r.nom, r.prenom, r.email, r.id);
                        resolve(client);
                    }
                    reject({ error: MyError_1.MyError.CLIENT_NOT_FOUND });
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.getByName = (nom) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE).where('nom', nom)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let client = new client_1.Client(r.nom, r.prenom, r.email, r.id_client);
                        resolve(client);
                    }
                    reject({ error: MyError_1.MyError.CLIENT_NOT_FOUND });
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
    }
}
exports.ClientDAO = ClientDAO;
//# sourceMappingURL=clientDAO.js.map