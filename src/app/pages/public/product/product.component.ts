import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CardProductComponent } from "../../../component/public/card-product/card-product.component";
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule]
})
export class ProductComponent implements OnInit {

  product: any = {};
  category: any = {};
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categorieServices: CategoriesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe(
      data => {
        this.isLoading = false;
        this.product = data;
        console.log(this.product);
        this.categorieServices.getCategory(this.product.category_id).subscribe(
              data => {
                this.isLoading = false;
                console.log(data);
                this.category = data;
              },
              error => {
                this.isLoading = false;
                console.error('Error al cargar las categorias', error);
                
              }
        );
      },
      error => {
        this.isLoading = false;
        console.error('Error al cargar el producto', error);
        
      }
    );
  }
  TimerPlaceholder(){
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    }  
}
