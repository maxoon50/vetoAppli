"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilisateurDAO_1 = require("../DAL/utilisateurDAO");
const Error_1 = require("../Enums/Error");
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
        this.addUser = (user) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.insertOne(user)
                    .then((user) => {
                    resolve(user);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.removeUser = (id) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.remove(id)
                    .then((lineRemoved) => {
                    resolve(lineRemoved);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
        this.updateUser = (user) => {
            let dao = new utilisateurDAO_1.DAOUser();
            return new Promise((resolve, reject) => {
                dao.update(user)
                    .then((nbrLineChanged) => {
                    resolve(nbrLineChanged);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        };
    }
}
exports.UtilisateurBLL = UtilisateurBLL;
//# sourceMappingURL=utilisateurBLL.js.map