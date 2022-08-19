import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {DatabaseService} from "./database.service";
import firebase from 'firebase/compat/app';
import auth = firebase.auth;
import {Role, UserInfo} from "../models/UserInfo";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: UserInfo;

  constructor(private fsa: AngularFireAuth, private router: Router, private storage: DatabaseService) {
    this.fsa.authState.subscribe(async (user) => {
      if (user) {
        this.userData = await firstValueFrom(this.storage.getUserInfo());
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Get current user
  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fsa.authState.subscribe(user => {
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }

  // Method to check if user is logged in using firebase auth
  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fsa.authState.subscribe(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Send signin link to user's email
  sendSignInLinkToEmail(email: string): Promise<void> {
    const baseUrl = environment.baseUrl
    // save email in localstorage
    window.localStorage.setItem('email', email);
    console.log(baseUrl + '/auth/verification/?email=' + email)
    return this.fsa.sendSignInLinkToEmail(email, {
      handleCodeInApp: true,
      url: baseUrl + '/auth/verification?email=' + email,
    });
  }

  // Verify user's email
  verifyEmail(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const baseUrl = environment.baseUrl
      if (await this.fsa.isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('email');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        this.fsa.signInWithEmailLink(email!, window.location.href)
          .then(async (result) => {
            // Clear email from storage.
            window.localStorage.removeItem('email');
            const id = result.user!.email!.split('@')[0];
            // save user info in localstorage
            localStorage.setItem('uid', id);
            localStorage.setItem('email', result.user!.email!);
            localStorage.setItem('role', Role.User);
            await this.fsa.setPersistence(auth.Auth.Persistence.LOCAL)
            if (result.additionalUserInfo?.isNewUser) {
              // User is new, redirect to signup page.
              // id is email without domain
              const userInfo: UserInfo = {
                uid: id,
                email: result.user!.email!,
                role: Role.User,
              }
              console.log(userInfo)
              await this.storage.saveUserInfo(userInfo);
              console.log('SAVED user info')
              await this.router.navigate(['/student/fill-profile'], { replaceUrl: true });
            }
            await this.router.navigate(['/student/home'], { replaceUrl: true });
            resolve();
          })
          .catch((error) => {
            reject(error)
          });
      }
    })
  }

  signOut(): Promise<void> {
    return this.fsa.signOut()
      .then(() => {
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
      })
  }

}
