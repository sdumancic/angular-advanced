import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSearchHomeComponent } from './part-search-home.component';

describe('PartSearchHomeComponent', () => {
  let component: PartSearchHomeComponent;
  let fixture: ComponentFixture<PartSearchHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSearchHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
