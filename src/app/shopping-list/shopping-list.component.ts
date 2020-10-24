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

  items: Item[] = []; // Stores items from itemsService and will fill table
  name = '';
  qty: number = 0;
  price: number = 0;

  user: string;

  // Array of table columns
  displayedColumns: string[] = ['name', 'price', 'qty', 'total', 'remove'];

  constructor(private itemService: ItemsService, private userService: UserService) { 
    this.itemService.items$.subscribe(v => this.items = v); // updates local items[] via state management 
    this.userService.user$
      .subscribe(user => this.user = user ? user.username: null); // adds ternary to fix null error when logging out
  }

  // Add Item to table
  addItem(){
    this.itemService.addItem(this.name, this.qty, this.price);
    // Resets the input data on the form
    this.name = '';
    this.qty = 0;
    this.price = 0;
  }

  // Remove item from table
  removeItem(id){
    this.itemService.removeItem(id);
  }


  // Get the total cost of all quantitized items
  getTotalCost() {
    return this.items.map(t => t.price * t.qty).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
  }
}
