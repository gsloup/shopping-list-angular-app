import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { ItemsService } from '../services/items.service';

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

  constructor(private itemService: ItemsService) { 
    this.itemService.items$.subscribe(v => this.items = v)
  }

  ngOnInit(): void {
  }

  addItem(){
    this.itemService.addItem(this.name, this.qty, this.price);
  }

}
