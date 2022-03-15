import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSearchFormFieldComponent } from './part-search-form-field.component';

describe('PartSearchFormFieldComponent', () => {
  let component: PartSearchFormFieldComponent;
  let fixture: ComponentFixture<PartSearchFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSearchFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSearchFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
