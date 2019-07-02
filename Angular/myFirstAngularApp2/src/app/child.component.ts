import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'child',
  template: `
  <button type="button" (click)="change(-1)">Decrease</button>
  <button type="button" (click)="change(1)">Increase</button>`,
})
export class ChildComponent {
    @Output() onChange = new EventEmitter;
  
  change(val) {
    this.onChange.emit(val);
  }
}
