import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCategoryComponent } from './button-category.component';

describe('ButtonCategoryComponent', () => {
  let component: ButtonCategoryComponent;
  let fixture: ComponentFixture<ButtonCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
