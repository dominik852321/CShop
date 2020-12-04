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

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.load4product();
  }

  load4product() {
    this.shopService.get4Products().subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    });
  }

}
