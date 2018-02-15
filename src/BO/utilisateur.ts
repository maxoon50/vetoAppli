export  class Utilisateur{
    
    constructor(pPseudo: string, pPassword: string, pRole: string){
        this.role = pRole;
        this.password = pPassword;
        this.pseudo = pPseudo;
    }

    role : string
    pseudo : string
    password : string
};