import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingRequestComponent } from './shopping-request.component';

describe('ShoppingRequestComponent', () => {
  let component: ShoppingRequestComponent;
  let fixture: ComponentFixture<ShoppingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
