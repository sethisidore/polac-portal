import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptorService } from './spinner-interceptor.service';

describe('SpinnerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnerInterceptorService = TestBed.get(SpinnerInterceptorService);
    expect(service).toBeTruthy();
  });
});
