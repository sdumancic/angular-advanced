import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDragDropHomeComponent } from './tree-drag-drop-home.component';

describe('TreeDragDropHomeComponent', () => {
  let component: TreeDragDropHomeComponent;
  let fixture: ComponentFixture<TreeDragDropHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeDragDropHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDragDropHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
