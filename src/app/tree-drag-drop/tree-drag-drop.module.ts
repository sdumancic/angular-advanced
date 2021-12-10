import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeDragDropHomeComponent } from './tree-drag-drop-home/tree-drag-drop-home.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { TreeDragDropRoutingModule } from './tree-drag-drop-routing.module';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  declarations: [TreeDragDropHomeComponent],
  imports: [
    CommonModule,
    TreeModule,
    TreeDragDropRoutingModule,
    MaterialModule,
  ],
})
export class TreeDragDropModule {}
