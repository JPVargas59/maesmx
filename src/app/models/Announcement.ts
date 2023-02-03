import { Timestamp } from 'firebase/firestore';

export interface Announcement {
  id: string;
  title: string;
  subject: string;
  url: string;
  endDate: Timestamp;
  roomLink: string;
  description?: string;
  startDate?: Date;
}
