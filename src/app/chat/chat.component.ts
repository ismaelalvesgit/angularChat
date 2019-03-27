import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MessagemService } from '../services/messagem.service';
import { LoginService } from '../services/login.service';
import { Messagem } from '../models/messagem.model';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  msg:Messagem[]= new Array<Messagem>()
  
  user:Login

  @Input() keyChat:string
  
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService
    ) { }
  
  goToChat(key){
    this.keyChat = key
    this.messageS.getData(key).subscribe((rs:Messagem[])=>{
      this.msg = rs   
      console.log(this.msg) 
    })
  }

  ngOnInit(): void {
    this.user = this.loginS.currentUser()
  }

}
