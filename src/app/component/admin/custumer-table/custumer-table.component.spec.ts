import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustumerTableComponent } from './custumer-table.component';

describe('CustumerTableComponent', () => {
  let component: CustumerTableComponent;
  let fixture: ComponentFixture<CustumerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustumerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustumerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
