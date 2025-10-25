/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Syncservice } from './syncservice.service';

describe('Service: Syncservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Syncservice]
    });
  });

  it('should ...', inject([Syncservice], (service: Syncservice) => {
    expect(service).toBeTruthy();
  }));
});
