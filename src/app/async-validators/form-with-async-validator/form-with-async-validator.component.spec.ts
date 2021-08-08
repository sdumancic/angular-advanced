import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithAsyncValidatorComponent } from './form-with-async-validator.component';

describe('FormWithAsyncValidatorComponent', () => {
  let component: FormWithAsyncValidatorComponent;
  let fixture: ComponentFixture<FormWithAsyncValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWithAsyncValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithAsyncValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
