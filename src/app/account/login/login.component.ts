import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
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
    private accountService: AccountManagementService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log('innnnnnnnnn')
    this.submitted = true;
    console.log(this.form.value)

    // this.loading = true;
    this.accountService.login(this.form.value)
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
