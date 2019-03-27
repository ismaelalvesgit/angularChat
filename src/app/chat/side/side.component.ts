import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagemService } from 'src/app/services/messagem.service';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'firebase';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  users:Login[] = new Array<Login>()
  currentUser:Login
  @Output() keyChat:EventEmitter<string> = new EventEmitter();
  
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService
  ) { }

  ngOnInit() {
    this.messageS.getUsers().subscribe((rs:Login[])=>{
      this.users = rs
      //retirar seu usuario da lista de usuários
      for(let i= 0; i < this.users.length; i++){
        if(this.loginS.currentUser().email == this.users[i].email){
          this.users.splice(i, 1)
        }
      }
      console.log(this.loginS.currentUser().email)
      this.currentUser = this.loginS.currentUser()
    })
  }

  getChat(chat:Login){
    let keyChat:string
    keyChat = this.messageS.getRoom(this.currentUser.uid, chat.uid)
    console.log("side",keyChat)
    this.keyChat.emit(keyChat)
  }

}
