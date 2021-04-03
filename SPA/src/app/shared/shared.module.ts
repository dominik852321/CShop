import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ChangeDefaultComponent } from './components/change-default/change-default.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextInputProductsComponent } from './components/text-input-products/text-input-products.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularDropdownModule } from 'angular-dropdown';





@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    ChangeDefaultComponent,
    TextInputProductsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    RouterModule,
    NgxSliderModule,
    ImageCropperModule,
    ModalModule.forRoot(),
    AngularDropdownModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    TextInputProductsComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    NgxGalleryModule,
    ChangeDefaultComponent,
    ImageCropperModule,
    ModalModule,
    AngularDropdownModule

  ]
})
export class SharedModule { }
