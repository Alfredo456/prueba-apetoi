// tslint:disable: max-line-length
// tslint:disable: radix
// tslint:disable: align
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-apetoi';
  public fromDate: NgbDateStruct;
  public form: FormGroup;

  constructor(calendar: NgbCalendar,
    config: NgbDatepickerConfig, private fb: FormBuilder) {
    config.minDate = { year: 1910, month: 1, day: 1 };
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.form = this.fb.group({
      inicialDate: [null, [Validators.required]],
      numberOfDays: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
    });
  }

  public format(event) {
    if (event) {
      if (event.day && event.month && event.year) {
        this.form.get('inicialDate').setValue(new Date(event.year + '/' + event.month + '/' + event.day));
      }
    }
  }

  public prueba() {
    console.log(this.form.value);
  }
}
