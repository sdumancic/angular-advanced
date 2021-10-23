import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionHomeComponent } from './change-detection-home/change-detection-home.component';
import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { FirstComponent } from './change-detection-home/first/first.component';
import { SecondComponent } from './change-detection-home/second/second.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChangeDetectionRoutingModule,
    HttpClientModule,
  ],
  declarations: [ChangeDetectionHomeComponent, FirstComponent, SecondComponent],
})
export class ChangeDetectionModule {}
