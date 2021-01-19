import { AdminService } from './../admin.service';
import { IOrderAdmin } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  
  orders: IOrderAdmin[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrdersByAdmin();

  }

  getOrdersByAdmin() {
     return this.adminService.getOrdersByAdmin().subscribe((orders: IOrderAdmin[]) => {
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }

}
