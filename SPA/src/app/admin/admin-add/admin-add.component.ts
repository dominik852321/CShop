import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent implements OnInit {
  addForm: FormGroup;


  fileToReturn: File = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.fb.group({
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
      photoFile: [null, Validators.required],
    });
  }

  addProduct(data) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('productTypeId', data.productTypeId);
    formData.append('productRoomId', data.productRoomId);
    formData.append('height', data.height);
    formData.append('width', data.width);
    formData.append('color1', data.color1);
    formData.append('color2', data.color2);
    formData.append('material1', data.material1);
    formData.append('material2', data.material2);
    formData.append('photoFile', this.fileToReturn);

    this.adminService.addProduct(formData).subscribe(
      (response) => {
        this.router.navigate(['admin']);
        this.toastr.success('Pomyślnie dodano');
      },
      (error) => {
        console.log(error);
      }
    );
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
}

