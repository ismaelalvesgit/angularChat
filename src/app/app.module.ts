import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from "@angular/fire"; //Firebase controllers
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

//ngx-bootstrap
import { TabsModule } from 'ngx-bootstrap/tabs';

//Services
import { LoginService } from './services/login.service';
import { MessagemService } from './services/messagem.service';

//pipe
import { SearchPipe } from './pipe/search.pipe';

//Components
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { ChatComponent } from './chat/chat.component';
import { MessagemComponent } from './chat/messagem/messagem.component';
import { SideComponent } from './chat/side/side.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    AcessoComponent,
    ChatComponent,
    MessagemComponent,
    SideComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    NgxSpinnerModule,// ToastrModule addd
    ReactiveFormsModule,//Formulários reativos do angular
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    TabsModule.forRoot()
  ],
  providers: [
    LoginService,
    AuthGuardService,
    MessagemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
