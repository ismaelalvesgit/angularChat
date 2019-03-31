import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

//@Author Ismael Alves
@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(
    private loginS:LoginService
  ){ }
  
  //protege a rota de chat
  canActivate(){
    return this.loginS.autenticarLogin()
  }
}
