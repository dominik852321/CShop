import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IProduct } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Panienka z okienka - Firany'; 

  products: IProduct[];
  mobile = false;

  constructor(private shopService: ShopService,  private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Gotowe Firany, firanki, zasłony, zazdroski, panele lub szyte na wymiar | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
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
