import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TipsService } from './tips.service';

describe('TipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TipsService = TestBed.get(TipsService);
    expect(service).toBeTruthy();
  });
});
