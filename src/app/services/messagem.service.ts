import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messagem } from '../models/messagem.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MessagemService {

  constructor(
    private af:AngularFirestore,
  ) { }

  //pegar os usurários cadastrados
  getUsers(){
    return this.af.collection('users').valueChanges()
  }

  //pegar as messagens do chat
  getData(key:string){
    return this.af.collection("msg").doc(key).collection("menssagens", ref=> ref.orderBy("dt")).valueChanges()
  }

  //envia a menssagem
  async sendMenssage(msg:Messagem, key:string, login:Usuario){
    console.log(login)
    console.log(key)
    return this.af.collection('msg').doc(key).collection("menssagens").add({
      msg:msg.msg,
      dt: new Date(),
      nome: login.nome,
      uid: login.uid,
      email: login.email
    })
  }

  //pega a sala de bate-papo
  getRoom(uid1:string, uid2:string):string{
    let keyRoom:string;
    if(uid1 < uid2 ){
      keyRoom = `${uid1}${uid2}`
    }else{
      keyRoom = `${uid2}${uid1}`
    }
    return keyRoom
  }
}
