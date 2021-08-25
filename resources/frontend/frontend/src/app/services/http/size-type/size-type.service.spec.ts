import { TestBed } from '@angular/core/testing';

import { SizeTypeService } from './size-type.service';

describe('SizeTypeService', () => {
  let service: SizeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
