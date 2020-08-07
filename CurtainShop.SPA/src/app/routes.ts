import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurtainListComponent } from './curtain/curtain-list/curtain-list.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { TableclothsListComponent } from './tablecloths/tablecloths-list/tablecloths-list.component';
import { ZaslonyListComponent } from './zaslony/zaslony-list/zaslony-list.component';
import { CurtainListResolver } from './_resolvers/curtain-list.resolver';
import { CurtainDetailComponent } from './curtain/curtain-detail/curtain-detail.component';
import { CurtainDetailResolver } from './_resolvers/curtain-detail.resolver';
import { TableclothsCardComponent } from './tablecloths/tablecloths-card/tablecloths-card.component';
import { TableClothListResolver } from './_resolvers/tablecloth-list.resolver';





export const appRoutes: Routes = [
   {path: '', component: HomeComponent },
   {path: '',
    runGuardsAndResolvers: 'always',
    children: [
      {path: 'firany', component : CurtainListComponent, resolve: {curtains : CurtainListResolver}},
      {path: 'firany/:id', component: CurtainDetailComponent, resolve: {curtain: CurtainDetailResolver}},
      {path: 'obrusy-i-podszewki', component: TableclothsListComponent, resolve: {tablecloths : TableClothListResolver}},
      {path: 'obrusy-i-podszewki/:id', component: TableclothsCardComponent},
      {path: 'zaslony', component: ZaslonyListComponent},
      {path: 'promocje', component: PromotionsComponent}
    ]}
];