import { AdminGuard } from './core/guards/admin.guard';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';



const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Strona główna'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'sklep', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: {skip: true}}},
  {path: 'informacje', loadChildren: () => import('./information/information.module').then(mod => mod.InformationModule), data: {breadcrumb: {skip: true}}},
  {path: 'koszyk', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'Koszyk'}},
  {path: 'formularz', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'Formularz'}},
  {path: 'konto', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: 'zamowienia', canActivate: [AuthGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: {breadcrumb: 'Zamówienia'}},
  {path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), data: {breadcrumb: 'Administrator'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
