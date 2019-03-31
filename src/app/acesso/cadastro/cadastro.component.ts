import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //mandar pra tab login
  @Output() loginTab:EventEmitter<number> = new EventEmitter();

  //arquivo img
  img:File

  //formulario controller
  form:FormGroup = new FormGroup({
    "email": new FormControl("", [ Validators.required, Validators.email]),
    "nome":new FormControl("", [Validators.required]),
    "senha": new FormControl("", [ Validators.required, Validators.minLength(6)]),
    "foto": new FormControl("", [Validators.required])
  })

  constructor(
    private loginS:LoginService,
    private toastrS:ToastrService,
    private spinnerS:NgxSpinnerService
  ) { }

  //metodo do ciclo de vida do angular ao iniciar o component
  ngOnInit() {
  }

  //pegar image do formulário
  getImage(event:Event){
    this.img = (<HTMLInputElement>event.target).files[0]
  }

  //metodo de criar um novo usuário
  createUser(){
    this.spinnerS.show()//começar spinner
    let create = new Usuario(this.form.value)
    create.foto = this.img
    this.loginS.createUser(create)
    .then((s)=>{
      this.spinnerS.hide()// finalizar spinner
      this.loginTab.emit(0)
      this.toastrS.success("sucesso!!", `usuário ${create.nome} criado com sucesso!!!`)
    })//metodo retornou um sucesso
    .catch((e:Error)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.error("Erro!!", `${e.message}`)
    })//metodo retornou um erro
  }
}
