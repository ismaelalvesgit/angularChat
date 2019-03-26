import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router:Router,
    private af:AngularFirestore,
    private afa:AngularFireAuth,
    private afs:AngularFireStorage
  ) { }

  //metodo de login
  async login(login:Login){
    return this.afa.auth.signInAndRetrieveDataWithEmailAndPassword(login.email, login.senha)
  }

  //metodo de login facebook
  async loginFacebook(){
    return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((user)=>{
      this.af.collection('users').doc(user.user.uid).set({
        uid:user.user.uid,
        nome:user.user.displayName,
        foto:user.user.photoURL,
        email:user.user.email
      })
      this.router.navigate(['/chat'])// navegar para rota chat
    })
  }

  //metodo de login google
  async loginGoogle(){
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{
      this.af.collection('users').doc(user.user.uid).set({
        uid:user.user.uid,
        nome:user.user.displayName,
        foto:user.user.photoURL,
        email:user.user.email
      })
      this.router.navigate(['/chat'])// navegar para rota chat
    })
  }

  //metodo que verifica autenticação esta ativa
  autenticarLogin():boolean{
    return this.afa.auth.currentUser !== undefined
  }

  //metodo criar usuario
  async createUser(create:Login){
    return this.afa.auth.createUserWithEmailAndPassword(create.email, create.senha).then((user)=>{
      //upload foto para storage
      this.afs.ref(`users/${user.user.uid}`).put(create.foto).then((foto)=>{
        //pegar url da foto ja no storage
        foto.ref.getDownloadURL().then((fotoUrl)=>{
          //salvar dados no firestore
          this.af.collection('users').add({
            uid: user.user.uid,
            foto: fotoUrl,
            email: create.email,
            nome:create.nome
          })
        })
      })
    })
  }

  //metodo logout
  async logout(){
    return this.afa.auth.signOut().then((user)=>{
      localStorage.clear()
      this.router.navigate(['/'])
    })
  }

  //metodo que pega usuario autenticado
  currentUser():firebase.User{
    return this.afa.auth.currentUser
  }
}
