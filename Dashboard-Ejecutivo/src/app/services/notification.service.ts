import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notification: BehaviorSubject<string> = new BehaviorSubject(null);
    readonly notification$: Observable<string> = this._notification.asObservable().publish().refCount();

    constructor() { }

    notify(message: any) {
        this._notification.next(message);
        setTimeout(() => this._notification.next(null), 3000);
    }
}
