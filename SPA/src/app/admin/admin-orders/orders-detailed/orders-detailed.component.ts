import { AdminService } from './../../admin.service';
import { IOrder } from './../../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-detailed',
  templateUrl: './orders-detailed.component.html',
  styleUrls: ['./orders-detailed.component.scss']
})
export class OrdersDetailedComponent implements OnInit {

  order: IOrder;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
     this.adminService.getOrderbyAdmin(+this.route.snapshot.paramMap.get('id')).subscribe((order: IOrder) =>{
      this.order = order;
    }, error => {
      console.log(error);
    });
  }
  

}
