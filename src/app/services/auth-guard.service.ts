import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private loginS:LoginService
  ){ }

  canActivate(){
    return this.loginS.autenticarLogin()
  }
}
