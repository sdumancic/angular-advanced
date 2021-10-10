import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FirstComponent implements OnInit {
  a: number;
  get title() {
    console.log('A ', new Date());
    return 'A';
  }

  constructor() {}

  ngOnInit(): void {}
}
