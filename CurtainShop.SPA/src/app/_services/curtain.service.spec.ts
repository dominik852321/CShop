/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurtainService } from './curtain.service';

describe('Service: Curtain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurtainService]
    });
  });

  it('should ...', inject([CurtainService], (service: CurtainService) => {
    expect(service).toBeTruthy();
  }));
});
