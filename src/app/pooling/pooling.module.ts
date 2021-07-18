import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolingService } from './pooling.service';
import { INTERVAL, PoolingConfig } from './pooling-config.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PoolingModule {
  poolingService: PoolingService;

  static forRoot(): ModuleWithProviders<PoolingModule> {
    return {
      ngModule: PoolingModule,
      providers: [PoolingService],
    };
  }

  static forChild(config: PoolingConfig): ModuleWithProviders<PoolingModule> {
    return {
      ngModule: PoolingModule,
      providers: [
        PoolingService,
        {
          provide: INTERVAL,
          useValue: config.interval || 2000,
        },
      ],
    };
  }
}
