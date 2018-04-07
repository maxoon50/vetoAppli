"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError {
}
MyError.ERR_SQL_INSERT = "Erreur lors de l'insert sql";
MyError.ERR_SQL_UPDATE = "Erreur lors de l'update sql";
MyError.ERR_SQL_DELETE = "Erreur lors du delete sql";
MyError.ERR_SQL_ADD = "Erreur lors de l'add sql";
MyError.CONSTR_CLIENT_NOM = "le nom renseigné doit comporter au minimum 2 caractères";
MyError.CONSTR_CLIENT_PRENOM = "le prénom renseigné doit comporter au minimum 2 caractères";
MyError.CONSTR_CLIENT_EMAIL = "merci de renseigner un email correct";
MyError.CONSTR_CLIENT_ID = "l'id renseigné est incorrect";
MyError.CLIENT_NOT_FOUND = "ce client n'existe pas";
MyError.NULL_ARGUMENT = "merci de renseigner une valeur valide";
MyError.ERR_DATABASE = "la database n'est pas joignable";
exports.MyError = MyError;
//# sourceMappingURL=MyError.js.map