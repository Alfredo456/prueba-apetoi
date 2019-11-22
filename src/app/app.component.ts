// tslint:disable: max-line-length
// tslint:disable: radix
// tslint:disable: align
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Day } from './day.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prueba-apetoi';
  public calendarSheet: Array<any> = [];
  public actualYear: number;
  public actualMonth: number;
  public final: Date;
  public inicial: Date;
  public fromDate: NgbDateStruct;
  public form: FormGroup;

  constructor(calendar: NgbCalendar,
    config: NgbDatepickerConfig, private fb: FormBuilder) {
    config.minDate = { year: 1910, month: 1, day: 1 };
  }

  public ngOnInit(): void {
    this.initForm();
    this.inicial = new Date('2019-10-01 00:00:00');
    let number = 25;
    this.actualYear = this.inicial.getFullYear();
    this.actualMonth = this.inicial.getMonth();
    this.final = this.addDays(new Date(this.inicial.getTime()), number);
    this.paintCalendar(this.inicial, this.final);
  }

  public initForm() {
    this.form = this.fb.group({
      inicialDate: [null, [Validators.required]],
      numberOfDays: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
    });
  }
  public firtsDay(date: Date): Date {
    date.setDate(date.getDate() + 1 - date.getDate());
    return date;
  }

  public lastDay(date: Date): Date {
    date.setDate(date.getDate() + 34);
    date.setDate(date.getDate() - date.getDate());
    return date;
  }

  public addDays(date: Date, day: number): Date {
    date.setDate(date.getDate() + day);
    return date;
  }

  public paintCalendar(firts: Date, last: Date): void {
    this.calendarSheet = [];
    const firstDayMonth = this.firtsDay(new Date(firts.getTime()));
    let day = 1;
    for (let weeks = 0; weeks < 6; weeks++) {
      const arrayDays = [];
      for (let indexDays = 0; indexDays < 7; indexDays++) {
        if ((weeks === 0 && indexDays === firstDayMonth.getDay() || (day > 1 && day <= last.getDate()))) {
          if (firts.getDate() > day) {
            arrayDays.push('D');
          } else {
            arrayDays.push(day);
          }
          day++;
        } else {
          arrayDays.push('D');
        }
      }
      this.calendarSheet.push(arrayDays);
    }
  }


  public format(event) {
    if (event) {
      if (event.day && event.month && event.year) {
        this.form.get('inicialDate').setValue(new Date(event.year + '/' + event.month + '/' + event.day));
      }
    }
  }

  public generate() {
    console.log(this.form.value);
  }
}
