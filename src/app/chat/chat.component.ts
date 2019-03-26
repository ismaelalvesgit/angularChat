import { Component, OnInit } from '@angular/core';
import { MessagemService } from '../services/messagem.service';
import { Messagem } from '../models/messagem.model';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { User } from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  msg:Observable<any[]>
  user:User
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService
    ) { }

  ngOnInit() {
    this.messageS.getData().subscribe((rs:any)=>{
      this.msg = rs
      this.user = this.loginS.currentUser()
    })
  }

}
