import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagemService } from 'src/app/services/messagem.service';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  users:Usuario[] = new Array<Usuario>()
  
  currentUser:Usuario
  
  @Output() keyChat:EventEmitter<string> = new EventEmitter();
  
  @Output() partner:EventEmitter<Usuario> = new EventEmitter();
  
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService,
  ) { }

  //metodo do ciclo de vida do angular ao iniciar o component
  ngOnInit() {
    //pegar usuario autenticado
    this.loginS.isLoggedIn().onAuthStateChanged((u)=>{
      this.loginS.currentUser(u.uid).subscribe((rs)=>{
        this.currentUser = rs[0]
        this.messageS.getUsers().subscribe((rs:Usuario[])=>{
          //retirar da lista de usuarios o usuario logado
          for(let i = 0; i < rs.length; i++){
            if(this.currentUser.email == rs[i].email){
              rs.splice(i, 1)
              this.users = rs
              console.log(this.users)
            }
          }
        })
      })
    })
  }

  //metodo que pega o usuario para o bate-papo
  getChat(chat:Usuario){
    let keyChat:string
    keyChat = this.messageS.getRoom(this.currentUser.uid, chat.uid)
    this.keyChat.emit(keyChat)//emite chave do chat para componet chat
    this.partner.emit(chat)//emite usuario do chat para componet chat
  }

}
