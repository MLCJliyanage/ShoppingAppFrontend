import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountManagementService } from '../services/account-management.service';
import { first } from 'rxjs/operators';

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
    //private alertService: AlertService
  ) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('innnnnnnnnn')
    if (this.form.valid) {
      this.submitted = true;
      console.log(this.form.value)

      // this.loading = true;
      this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            //this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error => {
            //this.alertService.error(error);
            this.loading = false;
          });

    }
  }



}


