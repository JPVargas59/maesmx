import { Timestamp } from 'firebase/firestore';

export interface Announcement {
  id: string;
  title: string;
  subject: string;
  endDate: Timestamp;
  startDate: Timestamp;
  place?: string;
  roomLink?: string;
  url?: string;
  description?: string;
  author?: any;
}
