// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private formDetailsSubject = new Subject<any>();

  sendFormDetails(details: any) {
    this.formDetailsSubject.next(details);
  }

  getFormDetails() {
    return this.formDetailsSubject.asObservable();
  }
}
