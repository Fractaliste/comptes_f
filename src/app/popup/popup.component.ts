import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { BusService } from '../services/bus/bus.service';

@Component({
  selector: 'c-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  @Input() popupId!: string
  @Input() popupTitle!: string
  myModal?: Modal;

  constructor(private eventBus: BusService) {
    eventBus.listen(BusService.PopupOpenEventType).subscribe((idPopup) => this.openPopup(idPopup))
  }


  ngOnInit(): void {
  }

  closeHandler() {
    this.eventBus.emit(BusService.PopupCloseEventType)
  }

  saveHandler() {
    this.eventBus.emit(BusService.PopupSaveEventType)
    if (this.myModal) {
      this.myModal.hide()
    }
  }

  openPopup(popupId: string) {
    const element = document.getElementById(popupId)
    if (element) {
      this.myModal = new Modal(element)
      this.myModal.show()
    }
  }

}
