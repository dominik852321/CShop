import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: IProduct[];
  mobile = false;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.load3product();
    if(window.innerWidth <= 800){
      this.mobile = true
    }
  }

  load3product() {
    this.shopService.get3Products().subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    });
  }

}
