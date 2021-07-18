import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';
import { PoolingService } from '../pooling/pooling.service';
import { PoolingModule } from '../pooling/pooling.module';
import { StateService } from '../state.service';
import { LazyChildComponent } from './lazy-child/lazy-child.component';

@NgModule({
  declarations: [LazyComponent, LazyChildComponent],
  imports: [
    CommonModule,
    LazyRoutingModule,
    PoolingModule.forChild({
      interval: 2000,
    }),
  ],
  exports: [LazyComponent],
  providers: [
    {
      provide: 'localModuleState',
      useClass: StateService,
    },
  ],
})
export class LazyModule {}
