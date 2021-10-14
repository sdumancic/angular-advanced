import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsOverviewComponent } from './order-items-overview.component';

describe('OrderItemsOverviewComponent', () => {
  let component: OrderItemsOverviewComponent;
  let fixture: ComponentFixture<OrderItemsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
