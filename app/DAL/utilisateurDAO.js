"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let connexion = require('./knexImpl');
const utilisateur_1 = require("../BO/utilisateur");
const Error_1 = require("../Enums/Error");
class DAOUser {
    constructor() {
        this.TABLE = "utilisateur";
        this.insertOne = (user) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .insert({
                    pseudo: user.pseudo,
                    password: user.password,
                    utilisateur_role: user.role
                })
                    .returning('id')
                    .then((id) => {
                    resolve(new utilisateur_1.Utilisateur(user.pseudo, user.password, user.role, id));
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
        this.update = (user) => {
            return new Promise((resolve, reject) => {
                connexion(this.TABLE)
                    .where('id', user.id)
                    .update({
                    pseudo: user.pseudo,
                    password: user.password,
                    utilisateur_role: user.role
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
                connexion(this.TABLE).where('id', id)
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
                connexion(this.TABLE).where('pseudo', pPseudo)
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