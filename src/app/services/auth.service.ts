// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password);
  }

  signUp(fullName: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.uid || null;
  }
}
