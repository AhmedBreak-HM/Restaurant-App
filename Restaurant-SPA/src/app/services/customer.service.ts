import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RepositoryService } from '../Repository/repository.service';
import { Customer } from '../models/customer.model';
import { ICustomerRepository } from '../interfaces/icustomer-repository';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends RepositoryService<Customer> implements ICustomerRepository {
 
  public Url: string = environment.apiUrl + '/Customer';

}
