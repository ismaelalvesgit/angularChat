import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messagem } from '../models/messagem.model';
import { Login } from '../models/login.model';
import * as firebase  from 'firebase';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagemService {

  constructor(
    private af:AngularFirestore,
    private loginS:LoginService
  ) { }

  getData(){
    return this.af.collection("msg").valueChanges()
  }

  async sendMenssage(msg:Messagem){
    return this.af.collection('msg').add({
      msg:msg.msg,
      dt: new Date(),
      nome: this.loginS.currentUser().displayName,
      foto: this.loginS.currentUser().photoURL,
      uid: this.loginS.currentUser().uid,
      email:this.loginS.currentUser().email
    })
  }

  getRoom(uid1:string, uid2:string):string{
    let keyRoom:string;
    if(uid1.length > uid2.length ){
      keyRoom = `${uid1+uid2}`
    }else{
      keyRoom = `${uid2+uid1}`
    }
    return keyRoom
  }
}
