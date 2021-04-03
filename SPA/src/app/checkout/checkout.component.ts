import { AccountService } from 'src/app/account/account.service';
import { IBasketTotals } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from './../basket/basket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  title = 'Formularz zamówienia | Sklep internetowy Panienka z okienka'; 
  
  checkoutForm: FormGroup;
  basketTotal$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private basketService: BasketService, private accountService: AccountService, private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Formularz składania zamówienia, wymagane pola prosze uzupełnić. Na końcu mamy krótki opis przebiegu realizacji | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
    this.createCheckoutForm();
    this.getDeliveryMethodValue();
    this.basketTotal$ = this.basketService.basketTotal$;
    this.getEmailCurrentUser();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        street: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        zipcode: [null, Validators.required],
        email:[null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
        phone: [null, [Validators.required, Validators.pattern('^\\d+$')]]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      })
    });
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket.deliveryMethodId !== null) {
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethodId.toString());
    }
  }

  getEmailCurrentUser() {
    const email = this.accountService.getCurrentUserEmail();
    if (email) {
      this.checkoutForm.get('addressForm').get('email').patchValue(email.toString());
    }
  }

}
