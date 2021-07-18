import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormsHomeComponent } from './shared-forms-home.component';

describe('SharedFormsHomeComponent', () => {
  let component: SharedFormsHomeComponent;
  let fixture: ComponentFixture<SharedFormsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFormsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFormsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
