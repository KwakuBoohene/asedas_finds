import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSizesComponent } from './manage-sizes.component';

describe('ManageSizesComponent', () => {
  let component: ManageSizesComponent;
  let fixture: ComponentFixture<ManageSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
