import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

class EventType<T> {

  subject = new Subject<T>()
}

@Injectable({
  providedIn: 'root'
})
export class BusService {

  static PopupCancelEventType = new EventType<void>()

  constructor() {
    let k = Object.entries(BusService)
    console.log(k);

  }

  listen<T>(type: EventType<T>): Subject<T> {
    return type.subject
  }

  emit<T>(type: EventType<T>, data?: T): void {
    type.subject.next(data)
  }
}
