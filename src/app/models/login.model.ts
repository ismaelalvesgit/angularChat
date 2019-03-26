export class Login {
    constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
    uid:string
    nome:string
    foto:File
    email:string
    senha:string
}
