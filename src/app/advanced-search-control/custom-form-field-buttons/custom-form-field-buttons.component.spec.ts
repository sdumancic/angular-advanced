import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormFieldButtonsComponent } from './custom-form-field-buttons.component';

describe('CustomFormFieldButtonsComponent', () => {
  let component: CustomFormFieldButtonsComponent;
  let fixture: ComponentFixture<CustomFormFieldButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormFieldButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormFieldButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
