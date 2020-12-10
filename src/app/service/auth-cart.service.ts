import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthCartService {

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  public createUser(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public singnOut() {
    return this.angularFireAuth.signOut();
  }

  public async sendEmailVerification() {
    return (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  public async sendPasswordResetEmail(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }


}
