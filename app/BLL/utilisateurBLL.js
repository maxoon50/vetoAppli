"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilisateur_1 = require("../BO/utilisateur");
const utilisateurDAO_1 = require("../DAL/utilisateurDAO");
const Error_1 = require("../Enums/Error");
const MyError_1 = require("../Errors/MyError");
class UtilisateurBLL {
    constructor() {
        this.checkLogin = (pPseudo, pPassword) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.getByName(pPseudo)
                    .then((user) => {
                    if (user.password == pPassword) {
                        resolve(user);
                    }
                    reject({ error: Error_1.Error.NotFound });
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.getAll = () => {
            let dao = new utilisateurDAO_1.DAOUser();
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
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.getById(id)
                    .then((user) => {
                    resolve(user);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.addUser = (req) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                if (this.validateUser(req)) {
                    let user = new utilisateur_1.Utilisateur(req.body.pseudo, req.body.password, req.body.role);
                    dao.insertOne(user)
                        .then((user) => {
                        resolve(user);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
                else {
                    reject("erreur, merci de vérifier que les champs renseigné soient corrects");
                }
            });
        };
        this.removeUser = (id) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.remove(id)
                    .then((lineRemoved) => {
                    if (lineRemoved == 1) {
                        resolve(lineRemoved);
                    }
                    reject(MyError_1.MyError.ERR_SQL_DELETE);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.updateUser = (req) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                if (this.validateUserWithId(req)) {
                    let user = new utilisateur_1.Utilisateur(req.body.pseudo, req.body.password, req.body.role, req.body.id);
                    dao.update(user)
                        .then((nbrLineChanged) => {
                        resolve({
                            nbrLineChanged,
                            user
                        });
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
                else {
                    reject("erreur, merci de vérifier que les champs renseignés soient corrects");
                }
            });
        };
        this.validateUserWithId = (req) => {
            try {
                if (req.body.pseudo != null && req.body.pseudo.length > 2
                    && req.body.password != null && req.body.password.length > 2
                    && req.body.role != null && req.body.role.length == 3
                    && req.body.id != null && !isNaN(parseInt(req.body.id))) {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
            return false;
        };
        this.validateUser = (req) => {
            try {
                if (req.body.pseudo != null && req.body.pseudo.length > 2
                    && req.body.password != null && req.body.password.length > 2
                    && req.body.role != null && req.body.role.length == 3) {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
            return false;
        };
    }
}
exports.UtilisateurBLL = UtilisateurBLL;
//# sourceMappingURL=utilisateurBLL.js.map