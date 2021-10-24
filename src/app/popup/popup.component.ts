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

  constructor(private eventBus: BusService) {
    console.log("popup created");

    eventBus.listen(BusService.PopupOpenEventType).subscribe(this.openPopup)
  }


  ngOnInit(): void {
  }

  closeHandler() {
    this.eventBus.emit(BusService.PopupCancelEventType)
  }

  saveHandler() {
    this.eventBus.emit(BusService.PopupSaveEventType)
  }

  openPopup(popupId: string) {
    const element = document.getElementById(popupId)
    if (element) {
      var myModal = new Modal(element)
      myModal.show()
      console.log("modal shown");

    }
  }

}
