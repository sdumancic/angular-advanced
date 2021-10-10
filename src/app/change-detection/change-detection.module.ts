import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionHomeComponent } from './change-detection-home/change-detection-home.component';
import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { FirstComponent } from './change-detection-home/first/first.component';
import { SecondComponent } from './change-detection-home/second/second.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ChangeDetectionRoutingModule],
  declarations: [ChangeDetectionHomeComponent, FirstComponent, SecondComponent],
})
export class ChangeDetectionModule {}
