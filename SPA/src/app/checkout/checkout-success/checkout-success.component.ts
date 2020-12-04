import { IUser } from './../../shared/models/user';
import { Observable } from 'rxjs';
import { IOrder } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
   order: IOrder;
   currentUser$: Observable<IUser>;

  constructor(private router: Router, private accountService: AccountService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state){
      this.order = state as IOrder;
    }
   }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

}
