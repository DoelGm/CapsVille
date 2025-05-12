import { Component, ViewChild } from '@angular/core';
import { CardProductComponent } from '../../component/card-product/card-product.component';
import { ButtonCategoryComponent } from "../../component/button-category/button-category.component";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [ButtonCategoryComponent, CardProductComponent]
})
export class CatalogComponent {
  @ViewChild('card') card!: CardProductComponent;
  selectedCategoryName: string = 'Todos los productos';

  onCategorySelected(category: { id: number, name: string }) {
    this.card.filterByCategory(category.id);
    this.selectedCategoryName = category.name;
  }
}
