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



import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CurtainListComponent } from './curtain/curtain-list/curtain-list.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { TableclothsListComponent } from './tablecloths/tablecloths-list/tablecloths-list.component';
import { CurtainCardComponent } from './curtain/curtain-card/curtain-card.component';
import { TableclothsCardComponent } from './tablecloths/tablecloths-card/tablecloths-card.component';
import { ZaslonyListComponent } from './zaslony/zaslony-list/zaslony-list.component';
import { CurtainListResolver } from './_resolvers/curtain-list.resolver';
import { CurtainService } from './_services/curtain.service';
import { CurtainDetailComponent } from './curtain/curtain-detail/curtain-detail.component';
import { CurtainDetailResolver } from './_resolvers/curtain-detail.resolver';
import { TableClothService } from './_services/tableCloth.service';
import { TableClothListResolver } from './_resolvers/tablecloth-list.resolver';
import { from } from 'rxjs';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      FooterComponent,
      CurtainListComponent,
      PromotionsComponent,
      TableclothsListComponent,
      CurtainCardComponent,
      TableclothsCardComponent,
      ZaslonyListComponent,
      CurtainDetailComponent
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
      NgxGalleryModule
   ],
   providers: [
      CurtainService,
      CurtainListResolver,
      CurtainDetailResolver,
      TableClothService,
      TableClothListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
