// tslint:disable: max-line-length
// tslint:disable: radix
// tslint:disable: align
import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-apetoi';
  public fromDate: NgbDateStruct;

  constructor(calendar: NgbCalendar,
    config: NgbDatepickerConfig) { }

  public format(event) {
  }
}
