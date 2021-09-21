import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private _subject = new Subject<any>();
  constructor() { }
  AddEvent(event: any) {
    this._subject.next(event);
  }

  get getEvent$() {
    return this._subject.asObservable();
  }
}
