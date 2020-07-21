import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';

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
      ZaslonyListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
   ],
   providers: [
      CurtainService,
      CurtainListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
