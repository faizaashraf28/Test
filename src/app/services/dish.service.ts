import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, from, of } from 'rxjs';
import { Dish } from '../models/dish.model';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {}

  getDishes(): Observable<Dish[]> {
    return from(this.authService.getCurrentUserId()).pipe(
      switchMap(userId => {
        console.log('Current User ID:', userId);
  
        if (userId) {
          return this.firestore.collection<Dish>('dishes', ref => ref.where('userId', '==', userId)).valueChanges();
        } else {
          return this.firestore.collection<Dish>('dishes').valueChanges();
        }
      })
    );
  }

  getDish(id: string): Observable<Dish | undefined> {
    return this.firestore.collection<Dish>('dishes').doc(id).valueChanges();
  }

  async addDish(newDish: Dish): Promise<Observable<void>> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      newDish.userId = userId;
      return from(this.firestore.collection('dishes').add(newDish)).pipe(
        map(() => undefined)
      );
    } else {
      console.error('User is not logged in');
      return of(); 
    }
  }
}
  