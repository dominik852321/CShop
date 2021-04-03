import { AccountService } from './account/account.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'Panienka z okienka - Firany';

  constructor(private basketService: BasketService, private accountService: AccountService, private titleService: Title, private metaTagService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Firany oraz firanki do salonu lub do kuchni szyte na wymiar, Gotowe i nowoczesne panele okienne | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
   this.loadBasket();
   this.loadCurrentUser();
  }



  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }

}


