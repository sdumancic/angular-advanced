import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSearchContainerComponent } from './part-search-container.component';

describe('PartSearchContainerComponent', () => {
  let component: PartSearchContainerComponent;
  let fixture: ComponentFixture<PartSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSearchContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
