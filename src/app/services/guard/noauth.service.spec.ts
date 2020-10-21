import { TestBed } from '@angular/core/testing';

import { NoauthService } from './noauth.service';

describe('NoauthService', () => {
  let service: NoauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
