import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ShopParams } from 'src/app/shared/models/shopParams';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: IProduct[];
  shopParams: ShopParams;
  totalCount: number;

  constructor(private adminService: AdminService) {
    this.shopParams = adminService.getShopParams();
   }

  ngOnInit(): void {
    this.getProductsByAdmin();
  }

  getProductsByAdmin() {
    return this.adminService.getProductsByAdmin().subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
      console.log();
    }, error => {
      console.log(error);
    });
  }

  onPageChanged(event: any) {
    const params = this.adminService.getShopParams();
    if (params.pageNumber !== event){
    params.pageNumber = event;
    this.adminService.setShopParams(params);
    this.getProductsByAdmin();
   }
  }

}
