export class Messagem {
    constructor(init?: Partial<Messagem>) {
        Object.assign(this, init);
    }
    messagem:string
    foto:string
}
