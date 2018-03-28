"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyError_1 = require("./MyError");
class BusinessError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, BusinessError.prototype);
        this.listeErreurs = [];
    }
    addErreur(err) {
        this.listeErreurs.push(MyError_1.MyError);
    }
    getErreurs() {
        return this.listeErreurs;
    }
}
exports.BusinessError = BusinessError;
//# sourceMappingURL=BusinessError.js.map