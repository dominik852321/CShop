import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';
import { ShopService } from './../../shop/shop.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
})
export class AdminEditComponent implements OnInit {
  product: IProduct;
  editForm: FormGroup;
  photoForm: FormGroup;

  fileToReturn: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createEditForm();
    this.createPhotoForm();
    this.loadProduct();
  }

  loadProduct() {
    this.adminService
      .getProductByAdmin(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (response) => {
          this.product = response;
          this.setValue();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createEditForm() {
    this.editForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      productTypeId: [null, Validators.required],
      productRoomId: [null, Validators.required],
      height: [null, Validators.required],
      width: [null, Validators.required],
      color1: [null, Validators.required],
      color2: [null, Validators.required],
      material1: [null, Validators.required],
      material2: [null, Validators.required],
    });
  }

  setValue() {
    this.editForm.patchValue({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      productTypeId: this.product.productRoomId,
      productRoomId: this.product.productTypeId,
      height: this.product.height,
      width: this.product.width,
      color1: this.product.color1,
      color2: this.product.color2,
      material1: this.product.material1,
      material2: this.product.material2,
    })
  }

  saveProduct(data) {
    this.adminService.updateProduct(this.product.id, data).subscribe(
      (product: IProduct) => {
        this.product = product;
        this.toastr.success('Dokonano aktualizacji');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeProduct() {
    this.adminService.removeProduct(this.product.id).subscribe((response) => {
      this.router.navigate(['admin']);
      this.toastr.success('Pomyślnie usunięto');
    }, error => {
      console.log(error);
     }
    )
  }

  createPhotoForm() {
    this.photoForm = this.fb.group({
      photoFile: [null, Validators.required]
    })
   }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    )
    return this.fileToReturn
   }

  base64ToFile(data, filename) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }

  addPhoto() {
    const formData = new FormData();
    formData.append('photoFile', this.fileToReturn);


    this.adminService.addPhoto(this.product.id, formData).subscribe(
      (response) => {
        this.router.navigate(['admin']);
        this.toastr.success('Pomyślnie dodano');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}


