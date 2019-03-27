import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Login } from '../models/login.model';
import "rxjs-compat/operator/map";
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  IdToken:string
  
  constructor(
    private router:Router,
    private af:AngularFirestore,
    private afa:AngularFireAuth,
    private afs:AngularFireStorage
  ) { }

  //metodo de login
  async login(login:Login){
    return this.afa.auth.signInAndRetrieveDataWithEmailAndPassword(login.email, login.senha).then((user)=>{
      this.af.collection('users').doc(user.user.uid).update({
        online:true
      })
      this.afa.auth.currentUser.getIdToken().then((idToken:any)=>{
        this.IdToken = idToken
        localStorage.setItem('idToken', idToken)
        this.router.navigate(['/chat'])
      })
    })
  }

  //metodo de login facebook
  async loginFacebook(){
    return this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((user)=>{
      this.af.collection('users').doc(user.user.uid).set({
        uid:user.user.uid,
        nome:user.user.displayName,
        foto:user.user.photoURL,
        email:user.user.email,
        online:true
      })
      this.afa.auth.currentUser.getIdToken().then((idToken:any)=>{
        this.IdToken = idToken
        localStorage.setItem('idToken', idToken)
        this.router.navigate(['/chat'])
      })
    })
  }

  //metodo de login google
  async loginGoogle(){
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{
      this.af.collection('users').doc(user.user.uid).set({
        uid:user.user.uid,
        nome:user.user.displayName,
        foto:user.user.photoURL,
        email:user.user.email,
        online:true
      })
      this.afa.auth.currentUser.getIdToken().then((idToken:any)=>{
        this.IdToken = idToken
        localStorage.setItem('idToken', idToken)
        this.router.navigate(['/chat'])
      })
    })
  }

  //metodo que verifica autenticação esta ativa
  autenticarLogin():boolean{
    if( this.IdToken ==  undefined && localStorage.getItem('idToken') ){
      this.IdToken = localStorage.getItem('idToken')
    }
    if( this.IdToken == undefined){
        this.router.navigate(['/'])
    }
    return this.IdToken !== undefined
  }

  //metodo criar usuario
  async createUser(create:Login){
    return this.afa.auth.createUserWithEmailAndPassword(create.email, create.senha).then((user)=>{
      //upload foto para storage
      this.afs.ref(`users/${user.user.uid}`).put(create.foto).then((foto)=>{
        //pegar url da foto ja no storage
        foto.ref.getDownloadURL().then((fotoUrl)=>{
          //salvar dados no firestore
          this.af.collection('users').doc(user.user.uid).set({
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
    this.af.collection('users').doc(this.currentUser().uid).update({
      online:false,
      dtLogin:new Date()
    })
    return this.afa.auth.signOut().then((user)=>{
      localStorage.clear()
      this.router.navigate(['/'])
    })
  }

  //metodo que pega usuario autenticado
  currentUser():Login{  
    let login:Login = new Login()
     this.af.collection("users", ref=> ref.where("uid", "==", this.afa.auth.currentUser.uid)).snapshotChanges().subscribe((rs)=>{
      rs.map((map)=>{
        login = map.payload.doc.data() as Login
      })
    })
    return login
  }
}
