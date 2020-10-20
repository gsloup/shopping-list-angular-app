import { TestBed } from '@angular/core/testing';

import { GenericGuard } from './generic.guard';

describe('GenericGuard', () => {
  let guard: GenericGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GenericGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
