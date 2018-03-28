import {MyError} from "./MyError";

export class BusinessError extends Error {

    private listeErreurs : MyError[] ;

    constructor() {
        super();
        Object.setPrototypeOf(this, BusinessError.prototype);
        this.listeErreurs = [];
    }

    public addErreur(err: MyError) {
        this.listeErreurs.push(MyError);
    }

    public getErreurs() {
        return this.listeErreurs;
    }



}