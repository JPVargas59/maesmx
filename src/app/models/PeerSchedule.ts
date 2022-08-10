import {WeekDays} from "./Settings";
import {UserInfo} from "./UserInfo";

export interface PeerSchedule {
  userInfo: UserInfo;
  hours: WeekDays[];
  day: WeekDays;
}
