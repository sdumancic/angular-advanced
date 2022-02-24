import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  yearOrder = 1;
  yearVisible = true;
  fuelOrder = 2;
  fuelVisible = true;
  colorOrder = 3;
  colorVisible = true;
  gearOrder = 4;
  gearVisible = true;
  engineOrder = 5;
  engineVisible = true;
  constructor() { }

  ngOnInit(): void {
  }

}
