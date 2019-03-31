import { Pipe, PipeTransform } from '@angular/core';
import { Login } from '../models/login.model';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(customers: Login[], args: string): any {   
    if(args){
      return customers.filter(customer => customer.nome.toLowerCase().indexOf(args.toLowerCase()) !== -1);
    }else{
      return customers
    }
    
  }
}