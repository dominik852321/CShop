import { SewingComponent } from './sewing/sewing.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path: 'omnie', component: AboutmeComponent, data: {breadcrumb: 'O mnie'}},
  {path: 'szycie-na-miare', component: SewingComponent, data: {breadcrumb: 'Firany na miare'}},
  {path: 'dostawa-platnosc', component: PaymentsComponent, data: {breadcrumb: 'Płatności'}},
  {path: 'regulamin', component: RegulationsComponent, data: {breadcrumb: 'Regulamin'}},
  {path: 'polityka-prywatnosci', component: PrivacypolicyComponent, data: {breadcrumb: 'Polityka prywatności'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
