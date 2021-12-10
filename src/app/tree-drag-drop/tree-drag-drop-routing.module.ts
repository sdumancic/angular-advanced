import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeDragDropHomeComponent } from './tree-drag-drop-home/tree-drag-drop-home.component';

const routes: Routes = [
  {
    path: '',
    component: TreeDragDropHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeDragDropRoutingModule {}
