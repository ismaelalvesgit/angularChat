import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //formulario controller
  form:FormGroup = new FormGroup({
    "email": new FormControl("", [ Validators.required, Validators.email]),
    "senha": new FormControl("", [ Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private loginS:LoginService,
    private toastrS:ToastrService,
    private spinnerS:NgxSpinnerService,
    private router:Router
  ) { }

  //metodo do ciclo de vida do angular ao iniciar o component
  ngOnInit() {
  }
  
  //metodo login
  login(){
    this.spinnerS.show()//começar spinner
    let login = new Usuario(this.form.value)
    this.loginS.login(login)
    .then((s)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.success("Sucesso!!!", `login ${login.email}`)
    })//metodo retornou um sucesso
    .catch((e:Error)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.error("Erro", e.message)
    })//metodo retornou um erro
  }

  //metodo login facebook
  loginFacebook(){
    this.spinnerS.show()//começar spinner
    this.loginS.loginFacebook()
    .then((s)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.success("Sucesso!!!")
    })//metodo retornou um sucesso
    .catch((e:Error)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.error("Erro", e.message)
    })//metodo retornou um erro
  }

  //metodo login google
  loginGoogle(){
    this.spinnerS.show()//começar spinner
    this.loginS.loginGoogle()
    .then((s)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.success("Sucesso!!!")
      this.router.navigate(["/chat"])
    })//metodo retornou um sucesso
    .catch((e:Error)=>{
      this.spinnerS.hide()// finalizar spinner
      this.toastrS.error("Erro", e.message)
    })//metodo retornou um erro
  }
}
