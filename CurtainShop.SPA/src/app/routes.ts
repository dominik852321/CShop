import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurtainListComponent } from './curtain/curtain-list/curtain-list.component';
import { TableclothsListComponent } from './tablecloths/tablecloths-list/tablecloths-list.component';
import { ZaslonyListComponent } from './zaslony/zaslony-list/zaslony-list.component';
import { CurtainListResolver } from './_resolvers/curtain-list.resolver';
import { CurtainDetailComponent } from './curtain/curtain-detail/curtain-detail.component';
import { CurtainDetailResolver } from './_resolvers/curtain-detail.resolver';
import { TableclothsCardComponent } from './tablecloths/tablecloths-card/tablecloths-card.component';
import { TableClothListResolver } from './_resolvers/tablecloth-list.resolver';
import { TableClothDetailResolver } from './_resolvers/tableCloth-detail.resolver';
import { TableclothsDetailComponent } from './tablecloths/tablecloths-detail/tablecloths-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RegulationsComponent } from './shop/regulations/regulations.component';
import { ContactComponent } from './shop/contact/contact.component';
import { ShopComponent } from './shop/shop/shop.component';





export const appRoutes: Routes = [
   {path: '', component: HomeComponent },
   {path: '',
    runGuardsAndResolvers: 'always',
    children: [
      {path: 'firany', component : CurtainListComponent, resolve: {curtains : CurtainListResolver}},
      {path: 'firany/:id', component: CurtainDetailComponent, resolve: {curtain: CurtainDetailResolver}},
      {path: 'obrusy-i-poszewki', component: TableclothsListComponent, resolve: {tablecloths : TableClothListResolver}},
      {path: 'obrusy-i-poszewki/:id', component: TableclothsDetailComponent, resolve: {tableCloth : TableClothDetailResolver}},
      {path: 'zaslony', component: ZaslonyListComponent},
      {path: 'regulamin', component: RegulationsComponent},
      {path: 'dane-sklepu', component: ContactComponent},
      {path: 'o-sklepie', component: ShopComponent},
 
      {path: 'zaloguj', component: LoginComponent},
      {path: 'rejestracja', component: RegisterComponent}
    ]}
];