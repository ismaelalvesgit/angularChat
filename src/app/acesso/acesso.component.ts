import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

//@Author Ismael Alves
@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})

export class AcessoComponent implements OnInit {

  //pegar tabs
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor() { }

  ngOnInit() {
  }
  
  //alterar tabs
  tabLogin(id){
    this.staticTabs.tabs[id].active = true
  }
}
