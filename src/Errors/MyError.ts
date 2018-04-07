export class MyError {

    ///////////////////////////// ERREURS SQL ///////////////////////////////


    public static ERR_SQL_INSERT = "Erreur lors de l'insert sql";

    public static ERR_SQL_UPDATE = "Erreur lors de l'update sql";

    public static ERR_SQL_DELETE = "Erreur lors du delete sql";

    public static ERR_SQL_ADD = "Erreur lors de l'add sql";

    ///////////////////////////// CONTRAINTES METIER ///////////////////////////////


    public static CONSTR_CLIENT_NOM = "le nom renseigné doit comporter au minimum 2 caractères";

    public static CONSTR_CLIENT_PRENOM = "le prénom renseigné doit comporter au minimum 2 caractères";

    public static CONSTR_CLIENT_EMAIL = "merci de renseigner un email correct";

    public static CONSTR_CLIENT_ID = "l'id renseigné est incorrect";

    public static CLIENT_NOT_FOUND = "ce client n'existe pas";


    ///////////////////////// ARGTS NULL //////////////////////////////////////////

    public static NULL_ARGUMENT = "merci de renseigner une valeur valide";


    //////////////////////// DB UNREACHABLE ///////////////////////////////////////

    public static ERR_DATABASE = "la database n'est pas joignable";







}