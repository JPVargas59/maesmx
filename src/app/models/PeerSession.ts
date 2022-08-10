import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {PeerInfo} from "./UserInfo";

export interface PeerSession {
  id?: string;
  status: string;
  startTime: Timestamp;
  endTime?: Timestamp;
  totalTime?: number;
  location?: string;
  comment?: string;
  peerInfo?: PeerInfo;
}

export enum PeerSessionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
}
