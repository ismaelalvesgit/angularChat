//Configurações
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { AuthGuardService } from './services/auth-guard.service';

//Componets
import { AcessoComponent } from './acesso/acesso.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:"", component: AcessoComponent},
  {path:"chat", component:ChatComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }