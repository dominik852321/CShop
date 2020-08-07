import { Component, OnInit } from '@angular/core';
import { Curtain } from 'src/app/_models/curtain';
import { CurtainService } from 'src/app/_services/curtain.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-curtain-detail',
  templateUrl: './curtain-detail.component.html',
  styleUrls: ['./curtain-detail.component.css'],
})
export class CurtainDetailComponent implements OnInit {
  
  curtain: Curtain;
  sizeForm: FormGroup;
  changeSizeMode = false;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryOptions[];

  firstHeight: number;
  firstWidth: number;
  firstPrice: number;

  resultWidth: number;
  resultHeight: number;

  result: number;

  constructor(
    private curtainService: CurtainService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.curtain = data.curtain;
    });
    this.firstHeight = this.curtain.height;
    this.firstWidth = this.curtain.width;
    this.firstPrice = this.curtain.price;

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

    this.galleryImages = this.GetImages();
  }

  // tslint:disable-next-line: typedef
  GetImages() {
    const imagesUrls = [];

    imagesUrls.push({
      small: this.curtain.photoUrl,
      medium: this.curtain.photoUrl,
      big: this.curtain.photoUrl
    });
    
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.curtain.photoMaterial.length; i++){
      imagesUrls.push({
       small: this.curtain.photoMaterial[i].url,
       medium: this.curtain.photoMaterial[i].url,
       big: this.curtain.photoMaterial[i].url
      });
    }

    return imagesUrls;
  }


  SizeToggle() {
    this.changeSizeMode = true;
    this.sizeForm = this.fb.group({
      height: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(1)],
      ],
      width: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(1)],
      ],
    });
  }

  Cancel() {
    this.changeSizeMode = false;
  }

  SaveSize() {
    console.log(this.sizeForm.value);
    this.curtain.height = this.sizeForm.value.height;
    this.curtain.width = this.sizeForm.value.width;

    this.resultWidth = Math.abs((this.curtain.width / this.firstWidth) * 1.5);
    this.resultHeight = Math.abs(
      (this.curtain.height / this.firstHeight) * 0.5
    );
    this.result = (this.resultHeight + this.resultWidth) / 2;
    this.curtain.price = Math.ceil(this.firstPrice * this.result);

    this.changeSizeMode = false;
  }
}
