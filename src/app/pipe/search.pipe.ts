import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  //faz a pesquisa pelo nome do usuário
  transform(customers: Usuario[], args: string): any {   
    if(args){
      return customers.filter(customer => customer.nome.toLowerCase().indexOf(args.toLowerCase()) !== -1);
    }else{
      return customers
    }
    
  }
}