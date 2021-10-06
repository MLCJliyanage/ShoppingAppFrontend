import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductManagementService } from 'src/app/product-management/services/product-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private productMgtService: ProductManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setViewForHome();
  }

  setViewForHome(): void {
    this.productMgtService.setManageView('DefaultView');
  }
  goToProducts(): void{
    this.setViewForHome();
    this.router.navigate(['/products'])
  }

}
