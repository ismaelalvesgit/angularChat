import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messagem } from '../models/messagem.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MessagemService {

  constructor(
    private af:AngularFirestore,
    private loginS:LoginService
  ) { }

  getUsers(){
    return this.af.collection('users').valueChanges()
  }

  getData(key:string){
    return this.af.collection("msg").doc(key).collection("menssagens", ref=> ref.orderBy("dt")).valueChanges()
  }

  async sendMenssage(msg:Messagem, key:string){
    return this.af.collection('msg').doc(key).collection("menssagens").add({
      msg:msg.msg,
      dt: new Date(),
      nome: this.loginS.currentUser().nome,
      uid: this.loginS.currentUser().uid,
      email:this.loginS.currentUser().email
    })
  }

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
