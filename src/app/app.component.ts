import { Component } from '@angular/core';
import { PoolingService } from './pooling/pooling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-di';

  constructor() {}
}
