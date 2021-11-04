import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Ligne, Tier } from '../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.sass']
})
export class LivreComponent implements OnInit {

  lignes: Ligne[] = []
  selectedLine?: Ligne;
  compteId = 2

  constructor(private backendService: BackendService, private busService: BusService) {
    backendService.getLignesByCompte(this.compteId).then(lignes => this.lignes = lignes)
    busService.listen(BusService.LigneSelectedEventType).subscribe(l => this.selectedLigneHandler(l))
    busService.listen(BusService.LigneSavedEventType).subscribe(l => this.savedLigneHandler(l))
    busService.listen(BusService.LigneDeletedEventType).subscribe(l => this.deletedLigneHandler(l))
  }

  ngOnInit(): void {
  }

  selectedLigneHandler(l: Ligne) {
    if (l.id) {
      let index = this.lignes.findIndex(ligne => ligne.id === l.id)
      if (this.lignes[index] !== l) {
        this.lignes.splice(index, 1, l)
      }
    }

    this.selectedLine = l
  }

  deletedLigneHandler(lineId: number): void {
    let index = this.lignes.findIndex(ligne => ligne.id === lineId)
    if (this.lignes[index]) {
      this.lignes.splice(index, 1)
    }
  }

  clickedLigneHandler(l: Ligne) {
    this.busService.emit(BusService.LigneSelectionRequetedEventType, l)
  }

  savedLigneHandler(l: Ligne): void {
    throw new Error('Method not implemented.');
  }

}
