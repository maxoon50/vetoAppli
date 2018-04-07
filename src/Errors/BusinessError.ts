import {MyError} from "./MyError";

export class BusinessError extends Error {

    private listeErreurs : string[] ;

    constructor() {
        super();
        Object.setPrototypeOf(this, BusinessError.prototype);
        this.listeErreurs = [];
    }

    public addErreur(err: string) {
        this.listeErreurs.push(err);
    }

    public getErreurs() {
        return this.listeErreurs;
    }



}