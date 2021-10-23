import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondComponent implements OnInit {
  get title() {
    console.log('B ', new Date());
    return 'B';
  }

  constructor() {}

  ngOnInit(): void {}
}
