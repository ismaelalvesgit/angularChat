import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messagem } from '../models/messagem.model';
import { Login } from '../models/login.model';
import * as firebase  from 'firebase';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class MessagemService {

  constructor(
    private af:AngularFirestore,
    private loginS:LoginService
  ) { }

  async getData(){
    return this.af.collection("chat").valueChanges()
  }

  async sendMenssage(msg:Messagem){
    return this.af.collection('msg').add({
      msg:msg.messagem,
      dt: new Date(),
      nome: this.loginS.currentUser().displayName,
      foto: this.loginS.currentUser().photoURL,
      uid: this.loginS.currentUser().uid
    })
  }
}
