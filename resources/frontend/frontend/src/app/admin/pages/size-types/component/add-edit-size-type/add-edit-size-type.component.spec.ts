import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSizeTypeComponent } from './add-edit-size-type.component';

describe('AddEditSizeTypeComponent', () => {
  let component: AddEditSizeTypeComponent;
  let fixture: ComponentFixture<AddEditSizeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSizeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSizeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
