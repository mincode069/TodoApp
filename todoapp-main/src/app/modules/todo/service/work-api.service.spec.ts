import { TestBed } from '@angular/core/testing';

import { WorkApiService } from './work-api.service';

describe('WorkApiService', () => {
  let service: WorkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
