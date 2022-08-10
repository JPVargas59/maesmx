import {PeerInfo, UserInfo} from "./UserInfo";
import {Subject} from "./Subject";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface HelpRequest {
  id?: string;
  userInfo: UserInfo;
  subject: Subject;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  comment?: string;
  peerInfo?: PeerInfo;
  resolvedAt?: Timestamp;
  status?: Status;
}

export enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  RESOLVED = 'RESOLVED',
  CANCELLED = 'CANCELLED',
  MISSED = 'NOT_RECEIVED'
}
