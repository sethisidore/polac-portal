import { TestBed } from '@angular/core/testing';

import { UserAccountService } from './user-account.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAccountService = TestBed.get(UserAccountService);
    expect(service).toBeTruthy();
  });
});
