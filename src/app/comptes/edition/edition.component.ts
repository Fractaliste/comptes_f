import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Compte } from "comptes_api";
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';

@Component({
  selector: 'c-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.sass']
})
export class EditionComponent implements OnInit {

  model = new Compte()


  constructor(private eventBus: BusService, private backendService: BackendService) {
    this.backendService.getComptes().then(comptes => {

      console.log("Compte",comptes);
    })


  }

  ngOnInit(): void {
    this.eventBus.listen(BusService.PopupCancelEventType).subscribe(() => console.log("Cancel received", this.model))
    // this.eventBus.listen(BusEvent.PopupSave)
    //   .subscribe(() => { 
    //     console.log("Save received", this.model) 
    //   this.backendService.saveCompte(this.model)
    //   })
  }

}
