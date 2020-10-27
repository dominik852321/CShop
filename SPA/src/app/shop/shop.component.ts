import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { IRoom } from '../shared/models/productRoom';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  types: IType[];
  rooms: IRoom[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
   {name: 'Alfabetycznie', value: 'name'},
   {name: 'Od najtańszego', value: 'priceAsc'},
   {name: 'Od najdroższego', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
      this.getProducts();
      this.getTypes();
      this.getRooms();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
       console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Wszystko'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getRooms() {
    this.shopService.getRooms().subscribe(response => {
      this.rooms = [{id: 0, name: 'Wszystko'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onRoomSelected(roomId: number) {
    this.shopParams.roomId = roomId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
