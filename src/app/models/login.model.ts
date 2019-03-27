export class Login {
    constructor(init?: Partial<Login>) {
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
