import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { User } from 'src/app/models/user';
import { ProductManagementService } from '../services/product-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  categoryList: any[] = [];
  manufacturerList: any[] = [];
  currentUser!: User;
  imageFile!: File;

  $routeParams!: Subscription
  productId!: number;
  product: any;

  formType = 'Add';
  submitBtnText = 'Add';
  isEditForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productMgtService: ProductManagementService,
    private route: ActivatedRoute,
    private accountService: AccountManagementService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getCategories();
    this.getManufacturers();

    this.getProductDetails();

    this.currentUser = this.getCurrentUser();

      this.form = this.formBuilder.group({
        Name: ['', [Validators.required]],
        Price: ['', [Validators.required]],
        Color: ['', [Validators.required]],
        InStock: [false, [Validators.required]],
        IsActive: [false, [Validators.required]],
        CategoryId: ['', [Validators.required]],
        ManufacturerId: ['', Validators.required],
        imageFile: [''],
        AddedUserId:[this.currentUser.id],
        Image:[],
        Id:[1]
      });

  }
  

  get f() { return this.form.controls; }

  getProductDetails(): void {
    this.$routeParams = this.route.params.subscribe(params => {
      this.productId = params.id;
      if (this.productId) {
        this.getProduct(this.productId)
      }
    })
  }

  getProduct(id: number) {
    this.productMgtService.getProductById(id).subscribe(data => {
      this.product = data;
      this.formType = 'Edit';
      this.submitBtnText = 'Update';
      this.isEditForm = true;

      this.setFormValues(data);
    })
  }


  setFormValues(data: any): void {
    this.form.controls['Id'].setValue(data.id)
    this.form.controls['Name'].setValue(data.name)
      this.form.controls['Price'].setValue(data.price)
      this.form.controls['Color'].setValue(data.color)
      this.form.controls['InStock'].setValue(data.inStock)
      this.form.controls['IsActive'].setValue(data.isActive)
      this.form.controls['CategoryId'].setValue(data.categoryId)
      this.form.controls['ManufacturerId'].setValue(data.manufacturerId)
      this.form.controls['Image'].setValue(data.image);
  }


  changeCategory(e: any): void {
  }

  getCategories() {
    this.productMgtService.getAllCategories().subscribe(
      (data: any) => {
        this.categoryList = data      
      });
  }

  getManufacturers() {
    this.productMgtService.getAllManufacturers().subscribe(
      (data: any) => {
        this.manufacturerList = data      
      });
  }

  onFileChange($event: any) {
    this.imageFile = $event.target.files[0]; 
    this.form.controls['Image'].setValue(this.imageFile ? this.imageFile.name.toString() : '');
  }

  uploadFile(image: File): void {
    if (image.name.toString() !== null) {
      this.productMgtService.uploadImage(image).subscribe((res)=>{
        
      },
      (err)=>{
        this.toastr.error('Product Image Upload Faild.');
      })
    }
  }

  getCurrentUser(): User {
    return JSON.parse(this.accountService.getUser().toString()) as User
  }

  onSubmit(): void {
    if (this.form.controls['imageFile'].value){
      this.uploadFile(this.imageFile);
    }

    if(this.form.valid && !this.isEditForm) {
      this.productMgtService.addProduct(this.form.value).subscribe((res) => {
        this.toastr.success('Product Added Successfully.');
      }, (err)=> {
        this.toastr.error('Product Add Faild.');
      })
    }

    if(this.form.valid && this.isEditForm){
      this.productMgtService.updateProduct(this.form.value).subscribe((res) => {
        this.toastr.success('Product Updated Successfully.');
    }, (err)=> {
      this.toastr.error('Product Update Faild.');
    })
    }
  }

}
