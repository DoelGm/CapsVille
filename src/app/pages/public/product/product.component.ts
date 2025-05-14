import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CardProductComponent } from "../../../component/public/card-product/card-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CardProductComponent]
})
export class ProductComponent implements OnInit {

  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
        console.log(this.product);
      },
      error => {
        console.error('Error al cargar el producto', error);
      }
    );
  }
}
