import {PeerSession} from "./PeerSession";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {WeekDays} from "./Settings";
import {Subject} from "./Subject";

export interface UserInfo {
  uid: string;
  email: string;
  name?: string;
  status?: string;
  lastname?: string;
  firstname?: string;
  photoURL?: string;
  role: Role;
  career?: string;
  area?: string;
  campus?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  activeRequest?: string;
  [key: string]: any;
}

export interface PeerInfo extends UserInfo {
  location?: string;
  activeSession?: PeerSession;
  weekSchedule?: WeekSchedule;
  subjects?: Subject[];
  totalTime?: number;
}

export type WeekSchedule = {
  [key in WeekDays]?: number[];
} & { };

export enum Role {
  Admin = 'admin',
  Coordi = 'coordi',
  SubjectCoordi = 'subjectCoordi',
  User = 'user',
  Peer = 'mae',
}

export enum PeerStatus {
  GradutateCandidateVolunteer = 'voluntario candidato a graduarse',
  Volunteer = 'voluntario',
  Scholarship = 'becario',
  Student = 'estudiante'
}
