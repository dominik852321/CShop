import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegulationsComponent } from './regulations/regulations.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationRoutingModule } from './information-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SewingComponent } from './sewing/sewing.component';


@NgModule({
  declarations: [AboutmeComponent, PaymentsComponent, PrivacypolicyComponent, RegulationsComponent, PaymentsComponent, SewingComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()

  ]
})
export class InformationModule { }
