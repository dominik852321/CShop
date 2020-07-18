import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurtainListComponent } from './curtain/curtain-list/curtain-list.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { TableclothsListComponent } from './tablecloths/tablecloths-list/tablecloths-list.component';
import { ZaslonyListComponent } from './zaslony/zaslony-list/zaslony-list.component';





export const appRoutes: Routes = [
   {path: '', component: HomeComponent },
   {path: 'firany', component : CurtainListComponent},
   {path: 'obrusy', component: TableclothsListComponent},
   {path: 'zaslony', component: ZaslonyListComponent},
   {path: 'promocje', component: PromotionsComponent}
];