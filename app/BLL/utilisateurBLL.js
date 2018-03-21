"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Dao = require('../DAL/utilisateurDAO');
const utilisateurDAO_1 = require("../DAL/utilisateurDAO");
const Error_1 = require("../Enums/Error");
class UtilisateurBLL {
}
UtilisateurBLL.checkLogin = (pPseudo, pPassword) => {
    let dao = new utilisateurDAO_1.DAOUser();
    return new Promise((resolve, reject) => {
        dao.getByName(pPseudo).then((user) => {
            if (user.password == pPassword) {
                resolve(user);
            }
            reject({ error: Error_1.Error.NotFound });
        }).catch((error) => {
            reject(error);
        });
    });
};
exports.UtilisateurBLL = UtilisateurBLL;
//# sourceMappingURL=utilisateurBLL.js.map