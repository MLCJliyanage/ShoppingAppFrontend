import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountManagementService } from '../services/account-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    loading = false;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountManagementService,
    private toastr: ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid){
      this.accountService.login(this.form.value)
          .subscribe(
              data => {
                  this.toastr.success('Login Success!');
                  if (localStorage.getItem('order') !== null)
                  {
                    if (JSON.parse(localStorage.getItem('order') as string).cartItems.length > 0)
                    {this.router.navigate(['/checkout'])}
                    else{
                      setTimeout(() => {this.router.navigate(['/home'])}, 500);
                    }

                  } else {
                    setTimeout(() => {this.router.navigate(['/home'])}, 500);
                  }
              },
              error => {
                  this.toastr.error('Login Faild!');
              });

      } else {
        
      }
  }

}
