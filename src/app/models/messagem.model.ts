export class Messagem {
    constructor(init?: Partial<Messagem>) {
        Object.assign(this, init);
    }
    msg:string
    dt:Date
    foto:string
    nome:string
    uid:string
}
