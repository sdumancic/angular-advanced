import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-detection-home',
  templateUrl: './change-detection-home.component.html',
  styleUrls: ['./change-detection-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
