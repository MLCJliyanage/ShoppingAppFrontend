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
  form2!: FormGroup;
  loading = false;
  submitted = false;
  categoryList: any[] = [];
  currentUser!: User;

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
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.getCategories();

    this.getProductDetails();

    this.currentUser = this.getCurrentUser();

      this.form = this.formBuilder.group({
        name: ['', [Validators.required,]],
        price: ['', [Validators.required]],
        color: ['', [Validators.required]],
        inStock: [false, [Validators.required]],
        isActive: [false, [Validators.required]],
        CategoryId: ['', [Validators.required]],
        imageFile: [''],
        addedUserId:[this.currentUser.id],
        image:[],
        id:[1]
      });

  }

  get f() { return this.form.controls; }

  getProductDetails(): void {
    this.$routeParams = this.route.params.subscribe(params => {
      this.productId = params.id;
      console.log(params)
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
      console.log(this.product)

      this.setFormValues(data);
    })
  }


  setFormValues(data: any): void {
    console.log(data);
    this.form.controls['id'].setValue(data.id)
    this.form.controls['name'].setValue(data.name)
      this.form.controls['price'].setValue(data.price)
      this.form.controls['color'].setValue(data.color)
      this.form.controls['inStock'].setValue(data.inStock)
      this.form.controls['isActive'].setValue(data.isActive)
      this.form.controls['CategoryId'].setValue(data.categoryId)
      this.form.controls['image'].setValue(data.image);
  }


  changeCategory(e: any): void {
    console.log(e.target.value)
    console.log(this.form.value)
  }

  getCategories() {
    this.productMgtService.getAllCategories().subscribe(
      (data: any) => {
        this.categoryList = data      
      });
  }

  onFileChange($event: any) {
    let file = $event.target.files[0]; 
    this.form.controls['image'].setValue(file ? file.name : '');
    console.log(this.form.value)

  }

  getCurrentUser(): User {
    return JSON.parse(this.accountService.getUser().toString()) as User
  }

  onSubmit(): void {
    console.log(this.form.value)
    if (this.form.controls['imageFile'].value){
      console.log('has file')
    }

    if(this.form.valid && !this.isEditForm) {
      console.log('valid')
      this.productMgtService.addProduct(this.form.value).subscribe((res) => {
        this.toastr.success('Product Added Successfully.');
      }, (err)=> {
        this.toastr.error('Product Add Faild.');
      })
    }

    if(this.form.valid && this.isEditForm){
      console.log('valid in edit')
      this.productMgtService.updateProduct(this.form.value).subscribe((res) => {
        this.toastr.success('Product Updated Successfully.');
    }, (err)=> {
      this.toastr.error('Product Update Faild.');
    })
    }
  }

}
