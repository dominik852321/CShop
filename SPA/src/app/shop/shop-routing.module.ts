import { PaneleComponent } from './panele/panele.component';
import { GotoweComponent } from './firany/gotowe/gotowe.component';
import { NowoczesneComponent } from './firany/nowoczesne/nowoczesne.component';
import { DosalonuComponent } from './firany/dosalonu/dosalonu.component';
import { DokuchniComponent } from './firany/dokuchni/dokuchni.component';
import { FiranyComponent } from './firany/firany/firany.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RoletyComponent } from './rolety/rolety.component';


const routes: Routes = [
  {path: 'firany', component: FiranyComponent, data: {breadcrumb: 'Firany'}},
  {path: 'firany-gotowe', component: GotoweComponent, data: {breadcrumb: 'Firany gotowe'}},
  {path: 'firany-nowoczesne', component: NowoczesneComponent, data: {breadcrumb: 'Firany nowoczesne'}},
  {path: 'firany-do-salonu', component: DosalonuComponent,  data: {breadcrumb: 'Firany do salonu'}},
  {path: 'firany-do-kuchni', component: DokuchniComponent,  data: {breadcrumb: 'Firany do kuchni'}},
  {path: 'panele', component: PaneleComponent, data: {breadcrumb: 'Panele'}},
  {path: 'rolety-rzymskie', component: RoletyComponent, data: {breadcrumb: 'Rolety rzymskie'}},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
