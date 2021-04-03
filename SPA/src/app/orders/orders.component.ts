import { OrdersService } from './orders.service';
import { IOrder } from './../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  title = 'Moje zamówienia | Sklep internetowy Panienka z okienka szyjemy na wymiar'
  orders: IOrder[];


  constructor(private ordersService: OrdersService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Gotowe Firany, firanki, zasłony, zazdroski, panele lub szyte na wymiar | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
    this.getOrders();
  }

  getOrders() {
    return this.ordersService.getOrdersForUser().subscribe((orders: IOrder[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }

}
