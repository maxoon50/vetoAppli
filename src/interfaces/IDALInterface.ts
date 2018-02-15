export interface DALInterface<T>{
    insertOne : (T) => any
    // remove: (number)=> any
    // update: (T)=>any
    // getAll: ()=> T
    // getById : (number)=> T
}