import { TestBed } from '@angular/core/testing';

import { EditItemFacadeService } from './edit-item-facade.service';

describe('EditItemFacadeService', () => {
  let service: EditItemFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditItemFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
