import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Compte } from '../../../../../comptes_api/lib/cjs';

class EventType<T> {

  subject = new Subject<T>()

  constructor(public name: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class BusService {

  static ErrorMessageEventType = new EventType<string>("ErrorMessageEventType")
  static PopupOpenEventType = new EventType<string>("PopupOpenEventType")
  static PopupCancelEventType = new EventType<void>("PopupCancelEventType")
  static PopupSaveEventType = new EventType<void>("PopupSaveEventType")
  static EditionCompteEventType = new EventType<Compte>("EditionCompteEventType")

  constructor() {
    let k = Object.entries(BusService)
    console.log(k);

  }

  listen<T>(type: EventType<T>): Subject<T> {
    return type.subject
  }

  emit<T>(type: EventType<T>, data?: T): void {
    console.debug("Event emmited", type.name);

    type.subject.next(data)
  }
}
