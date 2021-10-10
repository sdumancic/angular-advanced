import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionHomeComponent } from './change-detection-home.component';

describe('ChangeDetectionHomeComponent', () => {
  let component: ChangeDetectionHomeComponent;
  let fixture: ComponentFixture<ChangeDetectionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDetectionHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetectionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
