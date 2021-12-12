import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapping-overlay',
  templateUrl: './mapping-overlay.component.html',
  styleUrls: ['./mapping-overlay.component.scss'],
})
export class MappingOverlayComponent implements OnInit {
  constructor() {}

  @Input() value: string;
  @Output() valueChanged = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {}

  onClear() {
    this.value = '';
  }

  onClose() {
    this.close.emit();
  }

  onOk() {
    this.valueChanged.emit(this.value);
  }
}
