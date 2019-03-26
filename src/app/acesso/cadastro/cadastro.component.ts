import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  img:File

  form:FormGroup = new FormGroup({
    "email": new FormControl("", [ Validators.required, Validators.email]),
    "nome":new FormControl("", [Validators.required]),
    "senha": new FormControl("", [ Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private loginS:LoginService,
    private toastrS:ToastrService,
    private spinnerS:NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  getImage(event:Event){
    this.img = (<HTMLInputElement>event.target).files[0]
  }

  createUser(){
    this.spinnerS.show()//começar spinner
    let create = new Login(this.form.value)
    create.foto = this.img
    console.log(create)
    this.loginS.createUser(create)
      .then((s)=>{
        this.spinnerS.hide()// finalizar spinner
        this.toastrS.success("sucesso!!", `usuário ${create.nome} criado com sucesso!!!`)
      })
      .catch((e:Error)=>{
        this.spinnerS.hide()// finalizar spinner
        this.toastrS.error("Erro!!", `${e.message}`)
      })
  }
}
