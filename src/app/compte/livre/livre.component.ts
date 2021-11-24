import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Ligne } from '../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.sass']
})
export class LivreComponent {

  lignesForTotal: Ligne[] = []
  lignes: Ligne[] = []
  selectedLine?: Ligne;
  compteId?: number

  constructor(private backendService: BackendService, private busService: BusService,
    private ref: ChangeDetectorRef, private route: ActivatedRoute) {
    busService.listen(BusService.LigneSelectedEventType).subscribe(l => this.selectedLigneHandler(l))
    busService.listen(BusService.LigneSavedEventType).subscribe(l => this.savedLigneHandler(l))
    busService.listen(BusService.LigneDeletedEventType).subscribe(l => this.deletedLigneHandler(l))

    route.paramMap.subscribe(p => {
      if (p.has("id")) {
        this.compteId = Number(p.get("id"))
        backendService.getLignesByCompte(this.compteId).then(lignes => this.lignes = lignes)
      }
    })
  }

  selectedLigneHandler(l: Ligne) {
    this.selectedLine = l
  }

  deletedLigneHandler(lineId: number): void {
    let index = this.lignes.findIndex(ligne => ligne.id === lineId)
    if (this.lignes[index]) {
      this.lignes.splice(index, 1)
    }
    this.lignesForTotal = [...this.lignes]
  }

  clickedLigneHandler(l: Ligne) {
    this.busService.emit(BusService.LigneSelectionRequetedEventType, l)
  }

  savedLigneHandler(l: Ligne): void {
    console.log("saved", l);

    let index = this.lignes.findIndex(ligne => ligne.id === l.id)
    if (this.lignes[index] !== l) {
      this.lignes.splice(index, 1, l)
    }
    this.lignesForTotal = [...this.lignes]
  }

}
