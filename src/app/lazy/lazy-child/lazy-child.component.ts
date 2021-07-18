import { Component, Inject, OnInit } from '@angular/core';
import { IGlobalState } from 'src/app/global-state.model';
import { StateService } from 'src/app/state.service';
import { AppConfig, APP_CONFIG } from 'src/config.token';
import { ILazyModuleState, ILazyComponentState } from '../lazy.component';

export interface ILazyChildComponentState {
  fuel: string;
}

@Component({
  selector: 'app-lazy-child',
  templateUrl: './lazy-child.component.html',
  styleUrls: ['./lazy-child.component.scss'],
  providers: [
    {
      provide: 'componentState',
      useClass: StateService,
    },
  ],
})
export class LazyChildComponent implements OnInit {
  constructor(
    public globalStateService: StateService<IGlobalState>,
    @Inject('localModuleState')
    public localModuleStateService: StateService<ILazyModuleState>,
    @Inject('componentState')
    public componentStateService: StateService<ILazyChildComponentState>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  ngOnInit(): void {
    this.localModuleStateService.setState({
      color: 'red',
    });
    this.componentStateService.setState({
      fuel: 'Benzin',
    });
    console.log(this.config.experimentalEnabled);
  }
}
