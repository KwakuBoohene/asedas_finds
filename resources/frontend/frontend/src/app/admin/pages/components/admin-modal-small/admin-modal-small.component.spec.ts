import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalSmallComponent } from './admin-modal-small.component';

describe('AdminModalSmallComponent', () => {
  let component: AdminModalSmallComponent;
  let fixture: ComponentFixture<AdminModalSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModalSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
