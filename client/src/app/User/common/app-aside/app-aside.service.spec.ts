import { TestBed, inject } from '@angular/core/testing';

import { AsideService } from './app-aside.service';

describe('AppAsideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsideService]
    });
  });

  it('should be created', inject([AsideService], (service: AsideService) => {
    expect(service).toBeTruthy();
  }));
});
