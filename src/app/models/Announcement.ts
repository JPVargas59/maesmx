import { Timestamp } from 'firebase/firestore';

export interface Announcement {
  id: string;
  title: string;
  subject: string;
  url: string;
  endDate: Timestamp;
  registerForm: string;
  description?: string;
  startDate?: Date;
}
