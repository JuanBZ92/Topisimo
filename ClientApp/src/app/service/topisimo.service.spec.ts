import { TestBed } from '@angular/core/testing';

import { TopisimoService } from './topisimo.service';

describe('TopisimoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopisimoService = TestBed.get(TopisimoService);
    expect(service).toBeTruthy();
  });
});
