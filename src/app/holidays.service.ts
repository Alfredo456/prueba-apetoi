import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidaysService {

    public holidaysBaseURL = 'https://holidayapi.com/v1/holidays';
    public holidaysKey = '3b16c003-c5ee-49f5-b50b-3fc59ca27211';

    constructor(private http: HttpClient) {
    }

    getHolidays(payload) {
        return this.http.get(this.holidaysBaseURL.concat('?pretty&key=' + this.holidaysKey + '&country=' + payload.countryCode + '&year=2018'));
    }
}