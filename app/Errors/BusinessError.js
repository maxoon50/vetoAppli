"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, BusinessError.prototype);
        this.listeErreurs = [];
    }
    addErreur(err) {
        this.listeErreurs.push(err);
    }
    getErreurs() {
        return this.listeErreurs;
    }
}
exports.BusinessError = BusinessError;
//# sourceMappingURL=BusinessError.js.map