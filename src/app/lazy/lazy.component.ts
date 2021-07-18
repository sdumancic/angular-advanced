import { Component, Inject, OnInit, Self, SkipSelf } from '@angular/core';
import { IGlobalState } from '../global-state.model';
import { PoolingService } from '../pooling/pooling.service';
import { StateService } from '../state.service';

export interface ILazyModuleState {
  vin: string;
  color: string;
}

export interface ILazyComponentState {
  brand: string;
}

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  providers: [
    PoolingService,
    {
      provide: 'componentState',
      useClass: StateService,
    },
  ],
})
export class LazyComponent implements OnInit {
  constructor(
    @Self() public poolingService: PoolingService,
    @SkipSelf() public componentPoolingService: PoolingService,
    public globalStateService: StateService<IGlobalState>,
    @Inject('localModuleState')
    public localModuleStateService: StateService<ILazyModuleState>,
    @Inject('componentState')
    public componentStateService: StateService<ILazyComponentState>
  ) {
    this.componentPoolingService.prefix = 'Lazy';
    this.poolingService.log();
    this.componentPoolingService.log();
  }

  ngOnInit(): void {
    this.localModuleStateService.setState({
      vin: '123456',
    });
    this.componentStateService.setState({
      brand: 'Opel',
    });
  }
}
