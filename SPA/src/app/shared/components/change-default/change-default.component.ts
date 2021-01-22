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

  options: Options = {
    floor: 0,
    ceil: 500,
    step: 10
  };

  changeModeSize = false;

  constructor(private fb: FormBuilder, private basketService: BasketService) { }

  ngOnInit(): void {
    this.mainWidth = this.product.width;
    this.mainHeight = this.product.height;
    this.mainPrice = this.product.price;
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
      width: [this.mainWidth, [Validators.required, Validators.max(500), Validators.min(1)]],
      height: [this.mainHeight, [Validators.required, Validators.max(500), Validators.min(1)]]
    });
    this.changeModeSize = true;
  }

  saveSize(){
    if(this.newWidth != this.mainWidth && this.newWidth != undefined)
    {
      this.resultWidth = Math.abs((this.newWidth / this.mainWidth) * 1.5);
    }
    else
    {
      this.resultWidth = 1.5;
    }

    if(this.newHeight != this.mainHeight && this.newHeight != undefined)
    {
      this.resultHeight = Math.abs((this.newHeight / this.mainHeight) * 0.5);
    }
    else
    {
      this.resultHeight =  0.5;
    }
  
    var result = (this.resultHeight + this.resultWidth) / 2;
    var resultPrice = Math.ceil(this.mainPrice * result);
  
    this.product.price = resultPrice;
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
