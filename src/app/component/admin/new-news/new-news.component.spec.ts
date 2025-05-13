import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewsComponent } from './new-news.component';

describe('NewNewsComponent', () => {
  let component: NewNewsComponent;
  let fixture: ComponentFixture<NewNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
