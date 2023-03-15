import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { PeerInfo, Role, UserInfo } from '../models/UserInfo';
import { Subject } from '../models/Subject';
import { Major } from '../models/Major';
import { Campus } from '../models/Campus';
import { HelpRequest, Status } from '../models/HelpRequest';
import * as firestore from 'firebase/firestore';
import { PeerSession, PeerSessionStatus } from '../models/PeerSession';
import { Announcement } from '../models/Announcement';
import { Settings, WeekDays } from '../models/Settings';
import { PeerSchedule } from '../models/PeerSchedule';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  get timestamp() {
    return firestore.serverTimestamp() as firestore.Timestamp;
  }

  get deleteField() {
    return firestore.deleteField();
  }

  static incrementField(n: number) {
    return firestore.increment(n);
  }

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Get current user
  getUserInfo(): Observable<PeerInfo> {
    return this.afs
      .doc<UserInfo>('users/' + localStorage.getItem('uid'))
      .valueChanges() as Observable<UserInfo>;
  }

  // Save user info
  saveUserInfo(user: UserInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      const id = user.email.split('@')[0];
      this.afs
        .doc<UserInfo>('users/' + id)
        .set(user, { merge: true })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // upload file to storage
  uploadFile(file: File, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const ref = this.storage.ref(path);
      const task = ref.put(file);
      task
        .then(() => {
          ref.getDownloadURL().subscribe((url) => {
            resolve(url);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateUserInfo(uid: any, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afs
        .doc('users/' + uid)
        .update(data)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // get subjects from schools collection
  getSubjects(): Observable<Subject[]> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
      .collection(`schools/${emailDomain}/subjects`, (ref) =>
        ref.orderBy('name', 'asc')
      )
      .valueChanges({ idField: 'id' }) as Observable<Subject[]>;
  }

  getMajors(): Observable<Major[]> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
      .collection(`schools/${emailDomain}/majors`)
      .valueChanges({ idField: 'id' }) as Observable<Major[]>;
  }

  getMajorById(id: string): Observable<Major> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
    .doc(`schools/${emailDomain}/majors/${id}`)
    .valueChanges() as Observable<Major>;
  }

  getCampus(): Observable<Campus[]> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
      .collection(`schools/${emailDomain}/campus`)
      .valueChanges({ idField: 'id' }) as Observable<Campus[]>;

  }

  // add request to request collection with userInfo and subject and add request to user collection
  addRequest(
    userInfo: UserInfo,
    subject: { id: string; name: string },
    comment: string | undefined
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<HelpRequest>('requests')
        .add({
          userInfo: userInfo,
          subject: {
            id: subject.id,
            name: subject.name,
          },
          createdAt: this.timestamp,
          updatedAt: this.timestamp,
          comment: comment ?? '',
          status: Status.PENDING,
        })
        .then((request) => {
          this.afs
            .doc(`users/${userInfo.uid}`)
            .update({
              activeRequest: request.id,
            })
            .then(() => {
              resolve(request.id);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getHelpRequest(requestId: string): Observable<HelpRequest> {
    return this.afs
      .doc<any>(`requests/${requestId}`)
      .valueChanges() as Observable<HelpRequest>;
  }

  getActiveRequests(): Observable<HelpRequest[]> {
    return this.afs
      .collection<HelpRequest>('requests', (ref) =>
        ref.where('status', '==', Status.PENDING)
      )
      .valueChanges({ idField: 'id' }) as Observable<HelpRequest[]>;
  }

  updateHelpRequest(requestId: string, data: HelpRequest): Promise<void> {
    data.updatedAt = this.timestamp;
    return new Promise((resolve, reject) => {
      this.afs
        .doc(`requests/${requestId}`)
        .update(data)
        .then(() => {
          resolve();
        })
        .then(async () => {
          // add 1 to requests counter in school document
          if (data.status === Status.ACCEPTED) {
            await this.afs
              .doc(`schools/${localStorage.getItem('email')!.split('@')[1]}`)
              .update({
                sessionsNumber: DatabaseService.incrementField(1),
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  addPeerSession(peer: PeerInfo): Promise<void> {
    console.log(peer);
    const session: PeerSession = {
      status: PeerSessionStatus.PENDING,
      startTime: this.timestamp,
      location: peer.location,
      peerInfo: peer,
    };
    return new Promise((resolve, reject) => {
      this.afs
        .collection<PeerSession>(`users/${peer.uid}/sessions`)
        .add(session)
        .then((s) => {
          this.afs
            .doc<PeerInfo>(`users/${peer.uid}`)
            .update({
              activeSession: {
                ...session,
                id: s.id,
              },
              location: peer.location,
            })
            .then(() => {
              localStorage.setItem('activeSession', s.id);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPeerSession(peerId: string, sessionId: string): Observable<PeerSession> {
    return this.afs
      .doc<any>(`users/${peerId}/sessions/${sessionId}`)
      .valueChanges({ idField: 'id' }) as Observable<PeerSession>;
  }

  getCurrentUserActiveSession(): Observable<PeerSession> {
    return this.afs
      .doc<any>(
        `users/${localStorage.getItem('uid')}/sessions/${localStorage.getItem(
          'activeSession'
        )}`
      )
      .valueChanges({ idField: 'id' }) as Observable<PeerSession>;
  }

  endSession(peerId: string, session: PeerSession): Promise<void> {
    session.endTime = this.timestamp;
    const endTimeDate = new Date();
    session.totalTime =
      (endTimeDate.getTime() - session.startTime.toDate().getTime()) /
      1000 /
      60;
    if (session.totalTime > 300) {
      session.status = PeerSessionStatus.PENDING_APPROVAL;
    } else {
      session.status = PeerSessionStatus.ACCEPTED;
    }
    localStorage.removeItem('activeSession');
    return new Promise((resolve, reject) => {
      this.afs
        .doc(`users/${peerId}/sessions/${session.id}`)
        .update(session)
        .then((s) => {
          this.afs.doc(`users/${peerId}`).update({
            activeSession: this.deleteField,
            totalTime:
              session.status == PeerSessionStatus.ACCEPTED
                ? DatabaseService.incrementField(session.totalTime!)
                : DatabaseService.incrementField(0),
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // get users with active session
  getUsersWithActiveSession(): Observable<PeerInfo[]> {
    return this.afs
      .collection<PeerInfo>('users', (ref) =>
        ref.where('activeSession', '!=', null).orderBy('activeSession', 'asc')
      )
      .valueChanges({ idField: 'id' }) as Observable<PeerInfo[]>;
  }

  createAnnouncement(announcement: Announcement){
      const emailDomain = localStorage.getItem('email')!.split('@')[1];
  
      this.afs.doc(`schools/${emailDomain}/announcements/${announcement.id}`)
      .set(announcement)
      .then(() => {
        alert('El anuncio se creó con exito')
      }) 
      .catch(() => {
        alert('ERROR: El anuncio no pudo ser creado')
      }); 
    }

  deleteAnnouncement(id: string){
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    this.afs.doc(`schools/${emailDomain}/announcements/${id}`).delete()
  }

  getAnnouncementById(announcementId: string): Observable<Announcement> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
      .doc<Announcement>(`schools/${emailDomain}/announcements/${announcementId}`)
      .valueChanges() as Observable<Announcement>;

  }

  // get announcements from schools collection where endDate is greater than current date
  getAnnouncements(): Observable<Announcement[]> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    const today = new Date();

    return this.afs
      .collection(`schools/${emailDomain}/announcements`, (ref) =>
        ref
          .where('endDate', '>', today)
          .orderBy('endDate', 'asc')
      )
      .valueChanges({ idField: 'id' }) as Observable<Announcement[]>;
  }

  addAnnouncementAssistance(announcementId: string){
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    const userUid = localStorage.getItem('uid');
    const user = JSON.parse(localStorage.getItem('user') ?? '{name: null}');

    this.afs.doc(`schools/${emailDomain}/announcements/${announcementId}/attendants/${userUid}`)
    .set({
      ...user,
      attended: true
    }, {merge: true}); 
  }

  addAnnouncementComment(announcementId: string, comment: string){
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    const userUid = localStorage.getItem('uid');
    const user = JSON.parse(localStorage.getItem('user') ?? '{name: null}');

    this.afs.doc(`schools/${emailDomain}/announcements/${announcementId}/attendants/${userUid}`)
    .set({
      ...user,
      comment
    }, {merge: true}); 
  }

  getAnnouncementAssistance(id: string){
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs.collection(`schools/${emailDomain}/announcements/${id}/attendants`)
      .valueChanges() as Observable<PeerInfo[]>;
  }

  // get settings from schools collection
  getSettings(): Observable<Settings> {
    const emailDomain = localStorage.getItem('email')!.split('@')[1];
    return this.afs
      .doc<any>(`schools/${emailDomain}`)
      .valueChanges() as Observable<Settings>;
  }

  saveUserSchedule(peerInfo: PeerInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!peerInfo.weekSchedule)
        reject('Week schedule is empty, missing hours');
      if (!peerInfo.subjects) reject('Subjects is empty, missing subjects');
      for (let weekDay in peerInfo.weekSchedule) {
        // @ts-ignore
        if (!peerInfo.weekSchedule[weekDay])
          reject(`${weekDay} is empty, missing hours`);
        for (let subject of peerInfo.subjects!) {
          this.afs
            .doc(`schedule/${weekDay}/${subject.id}/${peerInfo.uid}/`)
            .set({
              // @ts-ignore
              hours: peerInfo.weekSchedule[weekDay],
              day: weekDay,
              userInfo: peerInfo,
            })
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      }
    });
  }

  getSchedules(day: WeekDays, subject: string): Observable<PeerSchedule[]> {
    return this.afs
      .collection<PeerSchedule>(`schedule/${day}/${subject}`, (ref) =>
        ref.orderBy('userInfo.name')
      )
      .valueChanges({ idField: 'id' }) as Observable<PeerSchedule[]>;
  }

  addAttendance(peer: PeerInfo, report: string) {
    const dateString = (new Date()).toISOString().split('T')[0]
    this.afs
      .collection('attendance').doc(dateString).collection('report').doc(peer.uid).set({
        ...peer,
        report
      }, { merge: true })
  }

  getTodaysAttendance() {
    const dateString = (new Date()).toISOString().split('T')[0]

    return this.afs
      .collection('attendance').doc(dateString).collection('report')
      .valueChanges() as Observable<any[]>;
  }

  getAttendanceReport(year: string, month: string, day: string){
    const dateString = (new Date(Number(year), Number(month) - 1, Number(day))).toISOString().split('T')[0]
    console.log(dateString)
    return this.afs
      .collection(`attendance/${dateString}/report`)
      .valueChanges() as Observable<any[]>;
  }

  getUser(uid: string): Observable<PeerInfo> {
    return this.afs
      .doc<any>(`users/${uid}`)
      .valueChanges({ idField: 'id' }) as Observable<PeerInfo>;
  }

  getUsersByName(name: string): Observable<PeerInfo[]> {
    return this.afs
      .collection<PeerInfo>('users', (ref) => ref.where('name', '==', name))
      .valueChanges({ idField: 'id' }) as Observable<PeerInfo[]>;
  }

  getUsersBySubject(subject: Subject): Observable<PeerInfo[]> {
    console.log(subject);
    return this.afs
      .collection<PeerInfo>('users', (ref) =>
        ref.where('subjects', 'array-contains', subject).orderBy('name', 'asc')
      )
      .valueChanges({ idField: 'id' }) as Observable<PeerInfo[]>;
  }

  getUsersByWeekDays(day: WeekDays): Observable<PeerInfo[]> {
    return this.afs
      .collection<PeerInfo>('users', (ref) =>
        ref.where('weekSchedule.' + day, '!=', null)
      )
      .valueChanges({ idField: 'id' }) as Observable<PeerInfo[]>;
  }

  getUsers(): Observable<PeerInfo[]> {
    return this.afs
      .collection<PeerInfo>('users', (ref) => ref.orderBy('name', 'asc'))
      .valueChanges({ idField: 'uid' });
  }

  addResolvedRequest(request: HelpRequest) {
    return this.afs.collection('requests').add(request);
  }
}
