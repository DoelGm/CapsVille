import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-category',
  imports: [CommonModule],
  templateUrl: './button-category.component.html',
  styleUrl: './button-category.component.css'
})
export class ButtonCategoryComponent {
  categories: any = [];

@Output() categorySelected = new EventEmitter<{ id: number, name: string }>();
  
  constructor(private categorieServices: CategoriesService ){}
  
  ngOnInit() {
    this.categorieServices.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
selectCategory(categoryId: number, categoryName: string) {
  this.categorySelected.emit({ id: categoryId, name: categoryName });
 

}
}
