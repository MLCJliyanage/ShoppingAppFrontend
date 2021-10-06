import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountManagementService } from '../services/account-management.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  mobNumberPattern = "^((\\+94-?)|0)?[0-9]{10}$";

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountManagementService,
    private toastr: ToastrService,
    private router : Router
  ) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;

      // this.loading = true;
      this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.success('Registered!');
            this.router.navigate(['/login'])
          },
          error => {
            this.toastr.error('Registration Faild!');
          });

    }
  }



}


