import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path: 'aboutme', component: AboutmeComponent, data: {breadcrumb: 'O mnie'}},
  {path: 'delivery-payments', component: PaymentsComponent, data: {breadcrumb: 'Płatności'}},
  {path: 'regulations', component: RegulationsComponent, data: {breadcrumb: 'Regulamin'}},
  {path: 'privacypolicy', component: PrivacypolicyComponent, data: {breadcrumb: 'Polityka prywatności'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
