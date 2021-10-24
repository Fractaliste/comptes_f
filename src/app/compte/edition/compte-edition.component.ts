import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Compte } from "comptes_api";
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';

@Component({
  selector: 'c-compte-edition',
  templateUrl: './compte-edition.component.html',
  styleUrls: ['./compte-edition.component.sass']
})
export class CompteEditionComponent implements OnInit {


  popupId = "editionCompteId"
  model?: Compte


  constructor(private eventBus: BusService, private backendService: BackendService) {
    eventBus.listen(BusService.EditionCompteEventType).subscribe(compte => {
      this.model = compte
      this.eventBus.emit(BusService.PopupOpenEventType, this.popupId)
    })

  }

  ngOnInit(): void {
    this.eventBus.listen(BusService.PopupCancelEventType).subscribe(() => console.log("Cancel received", this.model))
    this.eventBus.listen(BusService.PopupSaveEventType)
      .subscribe(() => {
        if (this.model) {
          console.log("Save received", this.model, new Compte())
          this.backendService.save(this.model)
        }
      })
  }

}
