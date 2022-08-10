import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export enum WeekDays {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday'
}

export const WeekDaysTranslate = {
  [WeekDays.Monday]: 'Lunes',
  [WeekDays.Tuesday]: 'Martes',
  [WeekDays.Wednesday]: 'Miercoles',
  [WeekDays.Thursday]: 'Jueves',
  [WeekDays.Friday]: 'Viernes',
  [WeekDays.Saturday]: 'Sabado',
  [WeekDays.Sunday]: 'Domingo'
}


export interface Settings {
  weekDays: WeekDays[];
  semesterStart: Timestamp;
  semesterEnd: Timestamp;
  resetEveryNoWeeks: number;
  scheduleStart: number;
  scheduleEnd: number;
  scheduleHoursGap: number;
  sessionsNumber: number;
}
