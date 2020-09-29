import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';




import { AppComponent } from './app.component';
import { NavComponent } from './main/nav/nav.component';
import { HomeComponent } from './main/home/home.component';
import { FooterComponent } from './main/footer/footer.component';
import { CurtainListComponent } from './products/curtain/curtain-list/curtain-list.component';
import { TableclothsListComponent } from './products/tablecloths/tablecloths-list/tablecloths-list.component';
import { CurtainCardComponent } from './products/curtain/curtain-card/curtain-card.component';
import { TableclothsCardComponent } from './products/tablecloths/tablecloths-card/tablecloths-card.component';
import { TableclothsDetailComponent } from './products/tablecloths/tablecloths-detail/tablecloths-detail.component';
import { ZaslonyListComponent } from './products/zaslony/zaslony-list/zaslony-list.component';
import { CurtainListResolver } from './_resolvers/curtain-list.resolver';
import { CurtainService } from './_services/curtain.service';
import { CurtainDetailComponent } from './products/curtain/curtain-detail/curtain-detail.component';
import { CurtainDetailResolver } from './_resolvers/curtain-detail.resolver';
import { TableClothService } from './_services/tableCloth.service';
import { TableClothListResolver } from './_resolvers/tablecloth-list.resolver';
import { TableClothDetailResolver } from './_resolvers/tableCloth-detail.resolver';

import { from } from 'rxjs';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RegulationsComponent } from './shop/regulations/regulations.component';
import { ContactComponent } from './shop/contact/contact.component';
import { ShopComponent } from './shop/shop/shop.component';
import { BasketComponent } from './basket/basket.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      FooterComponent,
      CurtainListComponent,
      TableclothsListComponent,
      CurtainCardComponent,
      TableclothsCardComponent,
      ZaslonyListComponent,
      CurtainDetailComponent,
      TableclothsDetailComponent,
      LoginComponent,
      RegisterComponent,
      RegulationsComponent,
      ContactComponent,
      ShopComponent,
      BasketComponent,

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      TabsModule.forRoot(),
      NgSelectModule,
      NgxSliderModule,
      PaginationModule.forRoot(),
      NgxGalleryModule,
      BrowserAnimationsModule,
      NgxNavbarModule
   ],
   providers: [
      CurtainService,
      CurtainListResolver,
      CurtainDetailResolver,
      TableClothService,
      TableClothListResolver,
      TableClothDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
