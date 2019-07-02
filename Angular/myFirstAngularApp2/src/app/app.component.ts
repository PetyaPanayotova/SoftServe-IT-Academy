import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clicks = 0;
  toDo = "";
  title = 'myFirstAngularApp2';
  i: number;
  toDoList: any[] = [1, 2, 3, 4];

  submit() {
    this.toDoList.push(this.toDo);
    this.toDo = "";
  }

  delete(i) {
    this.toDoList.splice(i, 1);
  }

  edit(i) {
    this.toDoList
  }

  updateClicks(val: number) {
    this.clicks += val;
  }
}
