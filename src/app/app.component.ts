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

  public setValuesCalendar(firts: Date): void {
    if (this.actualMonth === this.final.getMonth() && this.actualYear === this.final.getFullYear()) {
      this.paintCalendar(firts, this.final);
    } else {
      this.paintCalendar(firts, this.lastDay(new Date(this.firtsDay(new Date(firts.getTime())).getTime())));
    }
  }

  public paintCalendar(firts: Date, last: Date): void {
    this.calendarSheet = [];
    const firstDayMonth = this.firtsDay(new Date(firts.getTime()));
    let day = 1;
    for (let weeks = 0; weeks < 6; weeks++) {
      const arrayDays: Array<Day> = [];
      for (let indexDays = 0; indexDays < 7; indexDays++) {
        if ((weeks === 0 && indexDays === firstDayMonth.getDay() || (day > 1 && day <= last.getDate()))) {
          if (firts.getDate() > day) {
            const newDay = { number: null, type: null };
            arrayDays.push(newDay);
          } else {
            const newDay = { number: day, type: null };
            arrayDays.push(newDay);
          }
          day++;
        } else {
          const newDay = { number: null, type: null };
          arrayDays.push(newDay);
        }
      }
      this.calendarSheet.push(arrayDays);
    }
  }

  public next() {
    if (this.actualYear < this.final.getFullYear()) {
      if (this.actualMonth < 11) {
        this.actualMonth++;
      } else {
        this.actualMonth = 0;
        this.actualYear++;
      }
    } else {
      if (this.actualMonth < this.final.getMonth()) {
        this.actualMonth++;
      } else {
        return;
      }
    }
    this.setValuesCalendar(new Date(String(this.actualYear + '-' + (this.actualMonth + 1) + '-' + '01' + ' 00:00:00')));
  }

  public back() {
    if (this.actualYear > this.inicial.getFullYear()) {
      if (this.actualMonth > 0) {
        this.actualMonth--;
      } else {
        this.actualMonth = 11;
        this.actualYear--;
      }
    } else {
      if (this.actualMonth > this.inicial.getMonth()) {
        this.actualMonth--;
      } else {
        return;
      }
    }
    if (this.actualMonth === this.inicial.getMonth() && this.actualYear === this.inicial.getFullYear()) {
      this.setValuesCalendar(new Date(this.inicial));
    } else {
      this.setValuesCalendar(new Date(String(this.actualYear + '-' + (this.actualMonth + 1) + '-' + '01' + ' 00:00:00')));
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
    if (this.form.valid) {
      this.inicial = this.form.value.inicialDate;
      this.actualYear = this.inicial.getFullYear();
      this.actualMonth = this.inicial.getMonth();
      this.final = this.addDays(new Date(this.inicial.getTime()), parseInt(this.form.value.numberOfDays));
      this.setValuesCalendar(new Date(this.inicial));
    } else {
      this.inicial = null;
    }
  }

}
