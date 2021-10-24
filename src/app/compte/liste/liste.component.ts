import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Compte } from '../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {

  comptes: Compte[] = [];

  constructor(private backendService: BackendService, private busService: BusService) { }

  ngOnInit(): void {
    this.backendService.getAll(Compte).then(comptes => {
      this.comptes = comptes
    })
  }

  onAjouterCompte() {
    this.busService.emit(BusService.EditionCompteEventType, new Compte())
  }

  onEditerCompte(compte: Compte) {
    this.busService.emit(BusService.EditionCompteEventType, compte)
  }

}
