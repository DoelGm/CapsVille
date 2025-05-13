import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewsComponent } from './card-news.component';

describe('CardNewsComponent', () => {
  let component: CardNewsComponent;
  let fixture: ComponentFixture<CardNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
