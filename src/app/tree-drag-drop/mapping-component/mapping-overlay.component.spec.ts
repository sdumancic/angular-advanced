import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingComponentComponent } from './mapping-overlay.component';

describe('MappingComponentComponent', () => {
  let component: MappingComponentComponent;
  let fixture: ComponentFixture<MappingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MappingComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
