import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MessagemService } from 'src/app/services/messagem.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Messagem } from 'src/app/models/messagem.model';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-messagem',
  templateUrl: './messagem.component.html',
  styleUrls: ['./messagem.component.css']
})
export class MessagemComponent implements OnInit {
 

  img:File

  @Input() keyChat:string

  form:FormGroup = new FormGroup({
    "msg": new FormControl("", [ Validators.required]),
  })

  constructor(
    private msgS:MessagemService
  ) { }

  ngOnInit() {
    
  }

  getImage(event:Event){
    this.img = (<HTMLInputElement>event.target).files[0]
  }

  sendMessage(){
    let user = new Login()
    let msg = new Messagem(this.form.value)
    this.msgS.sendMenssage(msg, this.keyChat).then(()=>{
      this.form.reset()
    })
  }

}
