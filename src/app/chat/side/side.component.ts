import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagemService } from 'src/app/services/messagem.service';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  users:Login[] = new Array<Login>()
  currentUser:Login
  @Output() keyChat:EventEmitter<string> = new EventEmitter();
  @Output() partner:EventEmitter<Login> = new EventEmitter();
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService,
  ) { }

  ngOnInit() {
    this.loginS.isLoggedIn().onAuthStateChanged((u)=>{
      this.loginS.currentUser(u.uid).subscribe((rs)=>{
        this.currentUser = rs[0]
        this.messageS.getUsers().subscribe((rs:Login[])=>{
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

  getChat(chat:Login){
    let keyChat:string
    keyChat = this.messageS.getRoom(this.currentUser.uid, chat.uid)
    console.log("side",keyChat)
    this.keyChat.emit(keyChat)
    this.partner.emit(chat)
  }

}
