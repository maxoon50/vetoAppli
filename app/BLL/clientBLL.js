"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../BO/Client");
const clientDAO_1 = require("../DAL/clientDAO");
const BusinessError_1 = require("../Errors/BusinessError");
const MyError_1 = require("../Errors/MyError");
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
                    reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
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
                    reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
                });
            });
        };
        this.getAllByName = (name) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                if (name == null || name.trim().length == 0) {
                    reject(MyError_1.MyError.NULL_ARGUMENT);
                }
                else {
                    dao.getAllByName(name)
                        .then((client) => {
                        resolve(client);
                    })
                        .catch((error) => {
                        reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
                    });
                }
            });
        };
        this.addClient = (req) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                let errors = new BusinessError_1.BusinessError();
                this.validateClient(req, errors);
                if (errors.getErreurs().length > 0) {
                    reject({ error: errors.getErreurs() });
                }
                else {
                    let user = new Client_1.Client(req.body.nom, req.body.prenom, req.body.email);
                    dao.insertOne(user)
                        .then((client) => {
                        resolve(client);
                    })
                        .catch((error) => {
                        reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
                    });
                }
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
                    reject(MyError_1.MyError.ERR_SQL_DELETE);
                })
                    .catch((error) => {
                    reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
                });
            });
        };
        this.updateClient = (req) => {
            let dao = new clientDAO_1.ClientDAO();
            return new Promise((resolve, reject) => {
                let errors = new BusinessError_1.BusinessError();
                this.validateClientWithID(req, errors);
                if (errors.getErreurs().length > 0) {
                    reject({ error: errors.getErreurs() });
                }
                else {
                    let client = new Client_1.Client(req.body.nom, req.body.prenom, req.body.email, req.body.id);
                    dao.update(client)
                        .then((nbrLineChanged) => {
                        resolve({
                            nbrLineChanged,
                            client
                        });
                    })
                        .catch((error) => {
                        reject({ error: MyError_1.MyError.ERR_DATABASE, detail: error });
                    });
                }
            });
        };
        this.validateClientWithID = (req, errors) => {
            if (req.body.nom == null || req.body.nom.length < 3) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_NOM);
            }
            if (req.body.prenom == null || req.body.prenom.length < 3) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_PRENOM);
            }
            if (req.body.email == null || !this.validateEmail(req.body.email)) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_EMAIL);
            }
            if (req.body.id == null || !(req.body.id === parseInt(req.body.id, 10))) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_ID);
            }
        };
        this.validateClient = (req, errors) => {
            if (req.body.nom == null || req.body.nom.length < 3) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_NOM);
            }
            if (req.body.prenom == null || req.body.prenom.length < 3) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_PRENOM);
            }
            if (req.body.email == null || !this.validateEmail(req.body.email)) {
                errors.addErreur(MyError_1.MyError.CONSTR_CLIENT_EMAIL);
            }
        };
        this.validateEmail = (email) => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
    }
}
exports.ClientBLL = ClientBLL;
//# sourceMappingURL=clientBLL.js.map