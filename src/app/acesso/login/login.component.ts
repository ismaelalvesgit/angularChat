import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  ngOnInit() {
  }
  
  login(){
    this.spinnerS.show()
    let login = new Login(this.form.value)
    this.loginS.login(login)
    .then((s)=>{
      this.spinnerS.hide()
      this.toastrS.success("Sucesso!!!", `login ${login.email}`)
    })
    .catch((e:Error)=>{
      this.spinnerS.hide()
      this.toastrS.error("Erro", e.message)
    })
  }

  loginFacebook(){
    this.spinnerS.show()
    this.loginS.loginFacebook()
    .then((s)=>{
      this.spinnerS.hide()
      this.toastrS.success("Sucesso!!!")
    })
    .catch((e:Error)=>{
      this.spinnerS.hide()
      this.toastrS.error("Erro", e.message)
    })
  }

  loginGoogle(){
    this.spinnerS.show()
    this.loginS.loginGoogle()
    .then((s)=>{
      this.spinnerS.hide()
      this.toastrS.success("Sucesso!!!")
      this.router.navigate(["/chat"])
    })
    .catch((e:Error)=>{
      this.spinnerS.hide()
      this.toastrS.error("Erro", e.message)
    })
  }
}
