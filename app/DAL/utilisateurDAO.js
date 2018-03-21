"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let connexion = require('./knexImpl');
const utilisateur_1 = require("../BO/utilisateur");
const Error_1 = require("../Enums/Error");
class DAOUser {
    constructor() {
        this.insertOne = () => {
            return 5;
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