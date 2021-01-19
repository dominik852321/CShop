import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { OrdersDetailedComponent } from './admin-orders/orders-detailed/orders-detailed.component';


@NgModule({
  declarations: [AdminComponent, AdminOrdersComponent, AdminAddComponent, AdminEditComponent, AdminProductsComponent, OrdersDetailedComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
