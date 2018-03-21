export  class Utilisateur{
    
    constructor( pPseudo: string, pPassword: string, pRole: string, pId?:number){
        this.role = pRole;
        this.password = pPassword;
        this.pseudo = pPseudo;
        this.id = pId;
    }

    role : string
    pseudo : string
    password : string
    id: number
};