import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { ItemsService } from '../services/items.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  items: Item[] = []
  name = '';
  qty: number = 0;
  price: number = 0;
  user: string;

  constructor(private itemService: ItemsService, private userService: UserService) { 
    this.itemService.items$.subscribe(v => this.items = v); // updates local items[] via state management 
    this.userService.user$
      .subscribe(user => this.user = user ? user.username: null); // adds ternary to fix null error when logging out
    
  }

  ngOnInit(): void {
  }

  addItem(){
    this.itemService.addItem(this.name, this.qty, this.price);
    this.name = '';
    this.qty = 0;
    this.price = 0;
  }

  removeItem(id){
    this.itemService.removeItem(id);
  }

}
