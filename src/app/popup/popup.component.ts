import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { EventBusType } from '../services/event-bus-type';
import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'c-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  @Input() popupId!: string
  @Input() popupTitle!: string

  constructor(private eventBus: EventBusService) { }

  ngOnInit(): void {
  }

  closeHandler() {
    this.eventBus.emit(EventBusType.PopupCancel)
  }

  saveHandler() {
    this.eventBus.emit(EventBusType.PopupSave)
  }

}
