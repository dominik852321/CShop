import { Component, OnInit } from '@angular/core';
import { TableCloth } from 'src/app/_models/tablecloth';
import { NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery-9';
import { ActivatedRoute } from '@angular/router';
import { TableClothService } from '../../_services/tableCloth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-tablecloths-detail',
  templateUrl: './tablecloths-detail.component.html',
  styleUrls: ['./tablecloths-detail.component.css']
})
export class TableclothsDetailComponent implements OnInit {

  tableCloth: TableCloth;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryOptions[];

  constructor(
    private tableClothService: TableClothService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.tableCloth = data.tableCloth;
    });

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

  GetImages() {
    const imagesUrls = [];

    imagesUrls.push({
      small: this.tableCloth.photoUrl,
      medium: this.tableCloth.photoUrl,
      big: this.tableCloth.photoUrl
    });
    
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.tableCloth.photoMaterial.length; i++){
      imagesUrls.push({
       small: this.tableCloth.photoMaterial[i].url,
       medium: this.tableCloth.photoMaterial[i].url,
       big: this.tableCloth.photoMaterial[i].url
      });
    }

    return imagesUrls;
  }

}
