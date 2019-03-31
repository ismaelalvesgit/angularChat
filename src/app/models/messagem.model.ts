//class que reperesenda dados da messagem no banco
export class Messagem {
    constructor(init?: Partial<Messagem>) {
        Object.assign(this, init);
    }
    msg:string
    dt:Date
    foto:string
    nome:string
    uid:string
    email:string
}
