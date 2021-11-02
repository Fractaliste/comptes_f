import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Categorie, Compte, Ligne, Tier } from '../../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-ligne-edition',
  templateUrl: './ligne-edition.component.html',
  styleUrls: ['./ligne-edition.component.sass']
})
export class LigneEditionComponent {

  @Output() ligneEvent = new EventEmitter<Ligne>();

  @Input() compteId!: number
  ligne: Ligne = new Ligne()
  serializedLine = ""
  categories: Categorie[] = []
  date?: Date;
  tiers: Tier[] = []

  constructor(private eventBus: BusService, private backendService: BackendService) {
    backendService.getAll(Categorie).then(c => this.categories = c)
    backendService.getAll(Tier).then(tiers => this.tiers = tiers)


    this.eventBus.listen(BusService.LigneSelectedEventType).subscribe(ligne => {

      if (this.serializedLine === "" || JSON.stringify(this.ligne) === this.serializedLine) {
        this.setCurrentLigne(ligne);
      } else {
        console.debug("Des modifs doivent être commitées", this.serializedLine, JSON.stringify(this.ligne));
        this.eventBus.emit(BusService.ErrorMessageEventType, "Les modifications de la ligne n'ont pas été sauvegardées")
      }
    })

  }

  private setCurrentLigne(ligne: Ligne) {
    this.ligne = ligne;
    this.date = new Date(ligne.date);
    this.serializedLine = JSON.stringify(this.ligne);
    this.ligneEvent.emit(this.ligne);
  }

  /**
   * On sélectionne tout uniquement lorsque la touche ctrl est appuyée
   * @param event 
   */
  selectTarget(event: MouseEvent) {
    const inputElement = (event.target as HTMLInputElement);
    if (event.ctrlKey) {
      inputElement.select()
    }
  }

  onCategorieChange(catName: string) {
    const newCat = this.categories.find(c => c.name === catName)
    if (newCat) {
      this.ligne.categorie = newCat
    }
  }

  onTierChange(tierName: string) {
    const newTier = this.tiers.find(t => t.name === tierName)
    if (newTier) {
      this.ligne.tier = newTier
    } else {
      this.ligne.tier = new Tier()
      this.ligne.tier.name = tierName
    }
  }

  onDateChange(date: Event) {
    const newDate = (date.target as HTMLInputElement).valueAsDate
    if (newDate) {
      this.ligne.date = newDate
    }
  }

  onCancel() {
    if (this.serializedLine) {
      const previousLigne = JSON.parse(this.serializedLine);
      Object.getOwnPropertyNames(this.ligne)
        .forEach(key => {
          if (previousLigne[key] === undefined) {
            delete (this.ligne as any)[key]
          }
        })
      this.ligne = Object.assign(this.ligne, previousLigne)
    } else {
      this.ligne = new Ligne()
      this.ligneEvent.emit(this.ligne)
    }
  }

  onSave() {

    if (!this.ligne.compte) {
      this.ligne.compte = new Compte()
      this.ligne.compte.id = this.compteId
    }

      console.log("Send", this.ligne);
    const saveLigneCallback = () => this.backendService
      .save(this.ligne, Ligne)
      .then(ligne => {
        this.setCurrentLigne(ligne);
      })

    if (!this.ligne.tier.id) {
      this.backendService
        .save(this.ligne.tier, Tier)
        .then(tier => this.ligne.tier = tier)
        .then(() => saveLigneCallback())
    } else {
      saveLigneCallback()
    }
  }
}
