import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCarouselTwoComponent } from './custom-carousel-two.component';

describe('CustomCarouselTwoComponent', () => {
  let component: CustomCarouselTwoComponent;
  let fixture: ComponentFixture<CustomCarouselTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCarouselTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCarouselTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
