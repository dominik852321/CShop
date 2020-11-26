import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
    this.gallerySettings();
  }


  loadProduct() {
    this.shopService
      .getProduct(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (response) => {
          this.product = response;
          this.bcService.set('@productDetails', this.product.name);
          if (this.product.photos.length > 1)
          {
            this.galleryImages = this.getImages();
          }
        },
        (error) => {
          console.log(error);
        }
      );
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

  getImages() {
    const imageUrls = [];

    imageUrls.push({
      small: this.product.pictureUrl,
      medium: this.product.pictureUrl,
      big: this.product.pictureUrl,
    });

    for (let i = 0; i < this.product.photos.length; i++) {
      imageUrls.push({
        small: this.product.photos[i].pictureUrl,
        medium: this.product.photos[i].pictureUrl,
        big: this.product.photos[i].pictureUrl,
      });
    }

    return imageUrls;
  }

  gallerySettings() {
    this.galleryOptions = [
      {
        width: '100%',
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewZoom: true,
      },
       // max-width 500
      {
        breakpoint: 780,
        width: '100%',
        height: '280px'
      }
    ];
  }
}
