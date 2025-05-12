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

  @Output() categorySelected = new EventEmitter<number>();
  
  constructor(private categorieServices: CategoriesService ){}
  
  ngOnInit() {
    this.categorieServices.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }
 selectCategory(id: number) {
    this.categorySelected.emit(id);
  }
}
