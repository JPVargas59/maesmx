import { Injectable } from '@angular/core';
import {WeekDays, WeekDaysTranslate} from "../models/Settings";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  range(start: number, stop: number, step: number = 1): number[] {
    if (typeof stop == 'undefined') {
      // one param defined
      stop = start;
      start = 0;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  // check if two arrays are equal
  arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  hourToString(hour: number): string {
    let result = ''
    const hours = Math.floor(hour);
    if (hours < 10) {
      result = result.concat('0', hours.toString())
    } else {
      result = result.concat(hours.toString())
    }
    const minutes = Math.floor(hour % 1 * 60)
    if (minutes < 10) {
      result = result.concat(':0', minutes.toString())
    }
    else {
      result = result.concat(':', minutes.toString())
    }
    return result
  }

  weekDayToDay(weekDay: string): string {
    // @ts-ignore
    return WeekDaysTranslate[weekDay]
  }

  isUrl(url: string): boolean {
    // check with regex if url is valid
    const re = new RegExp('https:+')
    return re.test(url);
  }

  datePastHours(date: Date, hours: number) {
    const today = new Date()
    return today > new Date(date.setHours(date.getHours() + hours));
  }

}
