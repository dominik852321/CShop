import { OrdersDetailedComponent } from './admin-orders/orders-detailed/orders-detailed.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'orders', canActivate: [AdminGuard], component: AdminOrdersComponent, data: {breadcrumb: 'Zamówienia'}},
  {path: 'products', canActivate: [AdminGuard], component: AdminProductsComponent, data: {breadcrumb: 'Produkty'}},
  {path: 'add', canActivate: [AdminGuard], component: AdminAddComponent, data: {breadcrumb: 'Dodaj'}},
  {path: 'products/:id', canActivate: [AdminGuard], component: AdminEditComponent, data: {breadcrumb: 'Edytuj'}},
  {path: 'orders/:id', canActivate: [AdminGuard], component: OrdersDetailedComponent, data: {breadcrumb: 'Zamówienie'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
