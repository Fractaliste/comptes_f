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
  selectedLine: Ligne;
  compteId = 2

  constructor(private backendService: BackendService, private busService: BusService) {
    backendService.getLignesByCompte(this.compteId).then(lignes => this.lignes = lignes)
    this.selectedLine = new Ligne()
  }

  ngOnInit(): void {
  }

  selectedLineHandler(l: Ligne) {
    if (l.id) {
      let index = this.lignes.findIndex(ligne => ligne.id === l.id)
      if (this.lignes[index] !== l) {
        this.lignes.splice(index, 1, l)
      }
      console.log("found", this.lignes[index], this.lignes[index] === l);


    }


    this.selectedLine = l
  }

  lineClicked(l?: Ligne) {
    this.busService.emit(BusService.LigneSelectedEventType, l ? l : new Ligne())
  }

  supprimerLigne() {
    console.log("supprimerLigne", this.selectedLine, Boolean(!this.selectedLine.id))
    if (!this.selectedLine.id) {
      this.lineClicked()
    }
  }


}
