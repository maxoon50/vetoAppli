export class Client{

    id: number;
    nom: string;
    prenom: string;
    email: string;

    constructor(pNom: string, pPrenom:string, pEmail:string, pId: number  ){
        this.id = pId;
        this.email = pEmail;
        this.nom = pNom;
        this.prenom = pPrenom;
    }


}