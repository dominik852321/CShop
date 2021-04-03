import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { GotoweComponent } from './firany/gotowe/gotowe.component';
import { NowoczesneComponent } from './firany/nowoczesne/nowoczesne.component';
import { DosalonuComponent } from './firany/dosalonu/dosalonu.component';
import { DokuchniComponent } from './firany/dokuchni/dokuchni.component';
import { FiranyComponent } from './firany/firany/firany.component';
import { PaneleComponent } from './panele/panele.component';
import { RoletyComponent } from './rolety/rolety.component';


@NgModule({
  declarations: [ProductItemComponent, ProductDetailsComponent, GotoweComponent, NowoczesneComponent, DosalonuComponent, DokuchniComponent, FiranyComponent, PaneleComponent, RoletyComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    CollapseModule.forRoot(),
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ShopModule { }
