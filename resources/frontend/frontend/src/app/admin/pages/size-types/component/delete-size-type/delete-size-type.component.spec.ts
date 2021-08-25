import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSizeTypeComponent } from './delete-size-type.component';

describe('DeleteSizeTypeComponent', () => {
  let component: DeleteSizeTypeComponent;
  let fixture: ComponentFixture<DeleteSizeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSizeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSizeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
