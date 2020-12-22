import { IProduct } from './../../shared/models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  gallerySize: NgxGalleryImageSize[];

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService
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
          if (this.product.photos.length > 0 || this.product.pictureUrl.length > 0)
          {
            this.galleryImages = this.getImages();
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
        imageSwipe: true,
        previewZoomStep: 0.4,
      },
       // max-width 500
      {
        breakpoint: 500,
        height: '200px'
      }
    ];
  }


}
