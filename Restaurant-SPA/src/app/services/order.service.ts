import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrderRepository } from '../interfaces/iorder-repository';
import { Order } from '../models/order.model';
import { OrderDetails } from '../models/order-details.model';
import { RepositoryService } from '../Repository/repository.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RepositoryService<Order> implements IOrderRepository {

  public Url: string = environment.apiUrl + '/Order';
  orderDetails: OrderDetails[] = [];
}
