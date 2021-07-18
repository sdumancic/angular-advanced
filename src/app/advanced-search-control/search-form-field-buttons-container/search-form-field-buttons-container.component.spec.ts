import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormFieldButtonsContainerComponent } from './search-form-field-buttons-container.component';

describe('SearchFormFieldButtonsContainerComponent', () => {
  let component: SearchFormFieldButtonsContainerComponent;
  let fixture: ComponentFixture<SearchFormFieldButtonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormFieldButtonsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormFieldButtonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
