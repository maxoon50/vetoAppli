export interface DALInterface<T>{
    insertOne : (T) => any
    remove: (number)=> any
    update: (T)=>any
    getAll: ()=> Promise<T[]>
    getById : (number)=> Promise<T>
}