import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usermanagerGuard } from './usermanager.guard';

describe('usermanagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usermanagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
