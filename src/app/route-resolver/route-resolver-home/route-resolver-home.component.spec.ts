import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteResolverHomeComponent } from './route-resolver-home.component';

describe('RouteResolverHomeComponent', () => {
  let component: RouteResolverHomeComponent;
  let fixture: ComponentFixture<RouteResolverHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteResolverHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteResolverHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
