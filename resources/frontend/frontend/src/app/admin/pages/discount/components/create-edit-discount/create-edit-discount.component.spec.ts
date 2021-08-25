import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDiscountComponent } from './create-edit-discount.component';

describe('CreateEditDiscountComponent', () => {
  let component: CreateEditDiscountComponent;
  let fixture: ComponentFixture<CreateEditDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
