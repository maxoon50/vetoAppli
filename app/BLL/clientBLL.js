"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../BO/Client");
const clientDAO_1 = require("../DAL/clientDAO");
class ClientBLL {
    constructor() {
        this.getAll = () => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                dao.getAll()
                    .then((users) => {
                    resolve(users);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.getById = (id) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                dao.getById(id)
                    .then((client) => {
                    resolve(client);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.addClient = (req) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                let user = new Client_1.Client(req.body.nom, req.body.prenom, req.body.email);
                dao.insertOne(user)
                    .then((client) => {
                    resolve(user);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.removeClient = (id) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                dao.remove(id)
                    .then((lineRemoved) => {
                    if (lineRemoved == 1) {
                        resolve(lineRemoved);
                    }
                    reject("erreur lors de la suppression du user");
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.updateClient = (req) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                let client = new Client_1.Client(req.body.nom, req.body.prenom, req.body.email, req.body.id);
                dao.update(client)
                    .then((nbrLineChanged) => {
                    resolve({
                        nbrLineChanged,
                        client
                    });
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
    }
}
exports.ClientBLL = ClientBLL;
//# sourceMappingURL=clientBLL.js.map