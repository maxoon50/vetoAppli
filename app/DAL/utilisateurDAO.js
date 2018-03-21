"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let connexion = require('./knexImpl');
const utilisateur_1 = require("../BO/utilisateur");
const Error_1 = require("../Enums/Error");
class DAOUser {
    constructor() {
        this.insertOne = () => {
            return null;
        };
        this.remove = () => {
            return null;
        };
        this.update = () => {
            return null;
        };
        this.getAll = () => {
            return new Promise((resolve, reject) => {
                connexion('utilisateur')
                    .then((result) => {
                    var retArr = [];
                    if (result.length) {
                        for (var i = 0; i < result.length; i++) {
                            retArr.push(new utilisateur_1.Utilisateur(result[i].pseudo, result[i].password, result[i].utilisateur_role, result[i].id));
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
                connexion('utilisateur').where('id', id)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new utilisateur_1.Utilisateur(r.pseudo, r.password, r.utilisateur_role, r.id);
                        resolve(user);
                    }
                    reject({ error: Error_1.Error.NotFound });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        this.getByName = (pPseudo) => {
            return new Promise((resolve, reject) => {
                connexion('utilisateur').where('pseudo', pPseudo)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new utilisateur_1.Utilisateur(r.pseudo, r.password, r.utilisateur_role, r.id);
                        resolve(user);
                    }
                    reject({ error: Error_1.Error.NotFound });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
    }
}
exports.DAOUser = DAOUser;
;
//# sourceMappingURL=utilisateurDAO.js.map