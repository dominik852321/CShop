/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableClothService } from './tableCloth.service';

describe('Service: TableCloth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableClothService]
    });
  });

  it('should ...', inject([TableClothService], (service: TableClothService) => {
    expect(service).toBeTruthy();
  }));
});
