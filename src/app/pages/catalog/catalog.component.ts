import { Component } from '@angular/core';
import { CardProductComponent } from "../../component/card-product/card-product.component";
import { ButtonCategoryComponent } from "../../component/button-category/button-category.component";

@Component({
  selector: 'app-catalog',
  imports: [CardProductComponent, ButtonCategoryComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

}
