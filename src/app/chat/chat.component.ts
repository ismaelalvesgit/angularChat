import { Component, OnInit, Input } from '@angular/core';
import { MessagemService } from '../services/messagem.service';
import { LoginService } from '../services/login.service';
import { Messagem } from '../models/messagem.model';
import { Login } from '../models/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  msg:Messagem[]= new Array<Messagem>()
  
  currentUser:Login = new Login()

  partner:Login

  @Input() keyChat:string
  
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService,
    private toastrS:ToastrService
  ) { }
  
  ngOnInit() {
    //pegar usuario autenticado
    this.loginS.isLoggedIn().onAuthStateChanged(u=>{
      this.loginS.currentUser(u.uid).subscribe(rs=>{
        this.currentUser = rs[0]
        console.log(this.currentUser)
      })
    })
  }

  goToChat(key){
    this.keyChat = key
    this.messageS.getData(key).subscribe((rs:Messagem[])=>{
      this.msg = rs   
    })
  }

  getPartner(partner){
    this.partner = partner
  } 

  logout(){
    this.loginS.logout(this.currentUser.uid)
    .then(()=>{
      this.toastrS.success("Logout feito com sucesso!!!!")
    })
    .catch((e:Error)=>{
      this.toastrS.error(`${e.message}`)
    })
  }
}
