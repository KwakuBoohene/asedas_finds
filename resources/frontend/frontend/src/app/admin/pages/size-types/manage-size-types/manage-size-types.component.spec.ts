import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSizeTypesComponent } from './manage-size-types.component';

describe('ManageSizeTypesComponent', () => {
  let component: ManageSizeTypesComponent;
  let fixture: ComponentFixture<ManageSizeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSizeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSizeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
