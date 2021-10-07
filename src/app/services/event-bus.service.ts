import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventBusType } from './event-bus-type';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  bus: any;


  constructor() {
    const entries = Object.keys(EventBusType)
      .filter(key => isNaN(Number(key)))
      .map(key => [key, new Subject()])
    this.bus = Object.fromEntries(entries)

  }

  private getSubject(type: EventBusType): Subject<void> {
    return this.bus[EventBusType[type]];
  }

  listen(type: EventBusType): Subject<void> {
    return this.getSubject(type)
  }

  emit(type: EventBusType): void {
    this.getSubject(type).next()
  }
}
