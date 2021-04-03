import { NavigationExtras, Router } from '@angular/router';
import { IOrder } from './../../shared/models/order';
import { IBasket } from './../../shared/models/basket';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success('Zamówienie zostało dodane');
      this.basketService.deleteLocalBasket(basket.id);
      const navigationExtras: NavigationExtras = {state: order};
      this.router.navigate(['formularz/sukces'], navigationExtras);
    }, error => {
      this.toastr.error('Błąd');
      console.log(error);
    });
  }

  private getOrderToCreate(basket: IBasket) {
    const delivery = this.checkoutForm.get('deliveryForm').get('deliveryMethod').value;
    if (delivery !== null && this.checkoutForm.valid){
      return {
        basketId: basket.id,
        deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
        shipToAddress: this.checkoutForm.get('addressForm').value
      };
    }
  }
}


