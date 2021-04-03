import { IProduct } from './../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { BasketService } from 'src/app/basket/basket.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-change-default',
  templateUrl: './change-default.component.html',
  styleUrls: ['./change-default.component.scss']
})
export class ChangeDefaultComponent implements OnInit {
  @Input() product: IProduct;


  newWidth: number;
  newHeight: number;
  newPrice: number;
  mainWidth: number;
  mainHeight: number;
  mainPrice: number;
  resultWidth: number;
  resultHeight: number;
  sizeForm: FormGroup;
  quantity = 1;

  optionsWidth: Options;
  optionsHeight: Options;

  changeModeSize = false;

  constructor(private fb: FormBuilder, private basketService: BasketService) { }

  ngOnInit(): void {
    this.mainWidth = this.product.width;
    this.mainHeight = this.product.height;
    this.mainPrice = this.product.price;
    this.newWidth = this.mainWidth;
    this.newHeight = this.mainHeight;
  }
 




  cancel() {
    this.product.width = this.mainWidth;
    this.product.height = this.mainHeight;
    this.product.price = this.mainPrice;
    this.newWidth = this.mainWidth;
    this.newHeight = this.mainHeight;
    this.changeModeSize = false;
  }

  changeSize(){
    this.sizeForm = this.fb.group({
      width: [this.newWidth, [Validators.required, Validators.max(500), Validators.min(1)]],
      height: [this.newHeight, [Validators.required, Validators.max(500), Validators.min(1)]]
    });
    this.optionsWidth = {
      floor: this.mainWidth-100,
      ceil: this.mainWidth+100,
      step: 10
    };

    if(this.optionsWidth.floor < 0 )
    {
      this.optionsWidth.floor = 0;
    }
    if(this.optionsWidth.ceil < 0)
    {
      this.optionsWidth.ceil = 0;
    }
  
    this.optionsHeight = {
      floor: this.mainHeight-50,
      ceil: this.mainHeight+50,
      step: 10
    };

    if(this.optionsHeight.floor < 0 )
    {
      this.optionsHeight.floor = 0;
    }
    if(this.optionsHeight.ceil < 0)
    {
      this.optionsHeight.ceil = 0;
    }
    
    this.changeModeSize = true;
  }



  saveSize2(){
    if(this.newWidth != this.mainWidth && this.newWidth != undefined)
    {
      this.resultWidth = Math.abs((this.newWidth / this.mainWidth));
    }
    else
    {
      this.newWidth = this.mainWidth;
      this.resultWidth = 1;
    }

    if(this.newHeight != this.mainHeight && this.newHeight != undefined)
    {
      this.resultHeight = Math.abs((this.newHeight / this.mainHeight));
    }
    else
    {
      this.newHeight = this.mainHeight;
      this.resultHeight =  1;
    }

      var resultPrice = Math.ceil(this.mainPrice * this.resultWidth);
      var resultPrice2 = 0;

      if(this.resultHeight != 1)
      {
         resultPrice2 = Math.ceil((this.mainPrice * (((this.resultHeight-1)/2)+1))-this.mainPrice);
      }
    
      this.product.price =resultPrice + resultPrice2;
      this.product.width = this.newWidth;
      this.product.height = this.newHeight;
    
    
  

    this.changeModeSize = false;
  }

 
  
  
  

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  
}
