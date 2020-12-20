import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItemRepositry } from '../interfaces/iitem-repositry';
import { Item } from '../models/item.model';
import { RepositoryService } from '../Repository/repository.service';



@Injectable({
  providedIn: 'root'
})
export class ItemService extends RepositoryService<Item> implements IItemRepositry {

  public Url: string = environment.apiUrl + '/Item';
}
