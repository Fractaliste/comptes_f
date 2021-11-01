import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Categorie } from '../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-categorie-edition',
  templateUrl: './categorie-edition.component.html',
  styleUrls: ['./categorie-edition.component.sass']
})
export class CategorieEditionComponent implements OnInit {

  popupId = "CategorieEditionComponentPopupId"

  model!: Categorie

  constructor(private eventBus: BusService, private backendService: BackendService) {
    eventBus.listen(BusService.EditionCategorieEventType).subscribe(compte => {
      this.model = compte
      this.eventBus.emit(BusService.PopupOpenEventType, this.popupId)
    })
  }

  ngOnInit(): void {
    this.eventBus.listen(BusService.PopupCloseEventType).subscribe(() => console.log("Close popup received", this.model))
    this.eventBus.listen(BusService.PopupSaveEventType)
      .subscribe(() => {
        if (this.model) {
          this.backendService.save(this.model)
            .then(() => {
              if(!this.model.children) {
                return null
              }

              const promises = this.model.children
                .filter(c => c.type !== this.model.type)
                .map(c => {
                  c.type = this.model.type
                  return this.backendService.save(c, Categorie)
                })
              return Promise.all(promises)
            })
            .then(() => this.eventBus.emit(BusService.CategorieRefreshEventType))
        }
      })
  }

}
