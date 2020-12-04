import { BreadcrumbService } from 'xng-breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from './../../shared/models/order';
import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute,
              private bcService: BreadcrumbService) {
                this.bcService.set('@orderDetailed', ' ');
               }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.ordersService.getOrderByIdForUser(+this.route.snapshot.paramMap.get('id')).subscribe((order: IOrder) =>{
      this.order = order;
      this.bcService.set('@orderDetailed', `Zamówienie nr ${order.id} - ${order.status}`);
      console.log(order);
    }, error => {
      console.log(error);
    });
  }

}
