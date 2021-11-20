import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Categorie, Compte, Ligne, Tier } from '../../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-ligne-edition',
  templateUrl: './ligne-edition.component.html',
  styleUrls: ['./ligne-edition.component.sass']
})
export class LigneEditionComponent {

  @Input() compteId!: number
  ligne: Ligne = new Ligne()
  serializedLine = JSON.stringify({})
  categories: Categorie[] = []
  date?: Date;
  tiers: Tier[] = []
  valeur?: number

  @Input()
  total = ""

  constructor(private eventBus: BusService, private backendService: BackendService, private ref: ChangeDetectorRef) {
    backendService.getAll(Categorie).then(c => this.categories = c)
    backendService.getAll(Tier).then(tiers => this.tiers = tiers)


    this.eventBus.listen(BusService.LigneSelectionRequetedEventType).subscribe(ligne => {
      if (this.hasUncommitedChange()) {
        console.debug("Des modifs doivent être commitées", this.serializedLine, JSON.stringify(this.ligne));
        this.eventBus.emit(BusService.ErrorMessageEventType, "Les modifications de la ligne n'ont pas été sauvegardées")
      } else {
        this.setCurrentLigne(ligne);
      }
    })

  }

  public hasUncommitedChange() {
    return (!this.isCategorieValid()) || JSON.stringify(this.ligne) !== this.serializedLine;
  }

  isCategorieValid(): boolean {
    if (this.ligne.categorie) {
      return Boolean(this.ligne.categorie.id)
    }
    return true
  }

  private setCurrentLigne(ligne: Ligne) {
    this.ligne = ligne;
    this.date = new Date(ligne.date);
    this.valeur = (ligne.valeur) ? ligne.valeur / 100 : 0
    this.serializedLine = JSON.stringify(this.ligne);
    this.eventBus.emit(BusService.LigneSelectedEventType, this.ligne)
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
    } else {
      this.ligne.categorie = new Categorie()
      this.ligne.categorie.name = catName
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
      this.date = newDate
      this.ligne.date = newDate
    }
  }

  onValeurChange(newValeur: any) {
    this.valeur = newValeur
    this.ligne.valeur = newValeur * 100

  }

  cancelLigneHandler() {
    if (this.ligne.id) {
      const previousLigne = JSON.parse(this.serializedLine);
      Object.getOwnPropertyNames(this.ligne)
        .forEach(key => {
          if (previousLigne[key] === undefined) {
            delete (this.ligne as any)[key]
          }
        })
      this.ligne = Object.assign(this.ligne, previousLigne)
    } else {
      this.newLigneHandler(true)
    }
  }

  newLigneHandler(force: boolean = false) {
    if (force || !this.hasUncommitedChange()) {
      this.setCurrentLigne(new Ligne())
    }
  }

  supprimerLigneHandler() {
    if (!this.ligne.id) {
      this.newLigneHandler(true)
      return
    }

    this.backendService.safeDeleteLigne(this.ligne)
      .then((id: number) => {
        this.newLigneHandler(true)
        this.eventBus.emit(BusService.LigneDeletedEventType, id)
      })
  }

  sauvegarderLigneHandler() {
    
    if (!this.ligne.compte) {
      this.ligne.compte = new Compte()
      this.ligne.compte.id = this.compteId
    }

    if (!this.ligne.tier
      || !this.ligne.tier.name
      || !this.ligne.categorie
      || !this.isCategorieValid()
      || !this.ligne.valeur
      || !this.ligne.date
    ) {
      this.eventBus.emit(BusService.ErrorMessageEventType, "Champs obligatoires manquants !")
      return
    }

    console.log("Sauvegarde de la ligne", this.ligne);
    const saveLigneCallback = () => this.backendService
      .save(this.ligne, Ligne)
      .then(ligne => {
        this.setCurrentLigne(ligne);
        this.eventBus.emit(BusService.LigneSavedEventType, ligne)
        this.ref.markForCheck()
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
