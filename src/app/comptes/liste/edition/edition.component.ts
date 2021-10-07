import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Compte } from "comptes_api";
import { BackendService } from 'src/app/services/backend.service';
import { EventBusType } from 'src/app/services/event-bus-type';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'c-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.sass']
})
export class EditionComponent implements OnInit {

  model = new Compte()


  constructor(private eventBus: EventBusService, private backendService: BackendService) {
    this.backendService.getComptes().then(comptes => {

      console.log("Compte",comptes);
    })


  }

  ngOnInit(): void {
    this.eventBus.listen(EventBusType.PopupCancel).subscribe(() => console.log("Cancel received", this.model))
    this.eventBus.listen(EventBusType.PopupSave)
      .subscribe(() => { 
        console.log("Save received", this.model) 
      this.backendService.saveCompte(this.model)
      })
  }

}
