import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when non empty predicate method is call with empty string', () => {
    const searchString = ' ';
    expect(service.nonEmptyPredicate(searchString)).toEqual(false);
  });

  it('should return true when non empty predicate method is call with some string', () => {
    const searchString = 'javascript';
    expect(service.nonEmptyPredicate(searchString)).toEqual(true);
  });
});
