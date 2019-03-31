import { Component, OnInit, Input } from '@angular/core';
import { MessagemService } from 'src/app/services/messagem.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Messagem } from 'src/app/models/messagem.model';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-messagem',
  templateUrl: './messagem.component.html',
  styleUrls: ['./messagem.component.css']
})
export class MessagemComponent implements OnInit {
  
  //usuario autenticado
  currentUser:Usuario

  //arquivo img
  img:File

  //recebe dados do componet pai
  @Input() keyChat:string

  //formulario controller
  form:FormGroup = new FormGroup({
    "msg": new FormControl("", [ Validators.required]),
  })

  constructor(
    private msgS:MessagemService,
    private loginS:LoginService,
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

  //pegar image do formulário
  getImage(event:Event){
    this.img = (<HTMLInputElement>event.target).files[0]
  }

  //metodo de envio de messagem
  sendMessage(){
    let msg = new Messagem(this.form.value)
    this.msgS.sendMenssage(msg, this.keyChat, this.currentUser).then(()=>{
      this.form.reset()
    })
  }

}
