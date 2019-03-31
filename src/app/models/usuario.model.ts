//@Author Ismael Alves

//class que reperesenda dados do usuario no banco
export class Usuario {
    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init);
    }
    uid:string
    nome:string
    foto:File | string
    email:string
    senha:string
    online:boolean
    dtLogin:Date
}
