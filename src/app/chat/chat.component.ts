import { Component, OnInit, Input } from '@angular/core';
import { MessagemService } from '../services/messagem.service';
import { LoginService } from '../services/login.service';
import { Messagem } from '../models/messagem.model';
import { Usuario } from '../models/usuario.model';
import { ToastrService } from 'ngx-toastr';

//@Author Ismael Alves
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  //arrat de messagens
  msg:Messagem[]= new Array<Messagem>()
  
  //usuario autenticado
  currentUser:Usuario = new Usuario()
  
  //usuario do bate-papo
  partner:Usuario

  //manda chave do chat pra componet messagem
  @Input() keyChat:string
  
  constructor(
    private messageS:MessagemService,
    private loginS:LoginService,
    private toastrS:ToastrService
  ) { }
  
  //metodo do ciclo de vida do angular ao iniciar o component
  ngOnInit() {
    //pegar usuario autenticado
    this.loginS.isLoggedIn().onAuthStateChanged(u=>{
      this.loginS.currentUser(u.uid).subscribe(rs=>{
        this.currentUser = rs[0]
      })
    })
  }

  //recebe a chave do componet side
  goToChat(key){
    this.keyChat = key
    this.messageS.getData(key).subscribe((rs:Messagem[])=>{
      this.msg = rs   
    })
  }

  //recebe usuario bate-papo
  getPartner(partner){
    this.partner = partner
  } 

  //metodo logout
  logout(){
    this.loginS.logout(this.currentUser.uid)
    .then(()=>{
      this.toastrS.success("Logout feito com sucesso!!!!")
    })//metodo retornou um sucesso
    .catch((e:Error)=>{
      this.toastrS.error(`${e.message}`)
    })//metodo retornou um erro
  }
}
