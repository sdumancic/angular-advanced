import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormFieldContainerComponent } from './search-form-field-container.component';

describe('SearchFormFieldContainerComponent', () => {
  let component: SearchFormFieldContainerComponent;
  let fixture: ComponentFixture<SearchFormFieldContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormFieldContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
