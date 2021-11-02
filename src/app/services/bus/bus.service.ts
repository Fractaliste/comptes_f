import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categorie, Compte, Ligne } from '../../../../../comptes_api/lib/esm';

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
  static PopupCloseEventType = new EventType<void>("PopupCloseEventType")
  static PopupSaveEventType = new EventType<void>("PopupSaveEventType")
  static EditionCompteEventType = new EventType<Compte>("EditionCompteEventType")
  static EditionCategorieEventType = new EventType<Categorie>("EditionCategorieEventType")
  static CategorieRefreshEventType = new EventType<void>("CategorieRefreshEventType")
  static LigneSelectedEventType = new EventType<Ligne>("LigneSelectedEventType");

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
