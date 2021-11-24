import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  soldes: any = {}
  selectedCompteId?: number;

  constructor(private backendService: BackendService, private busService: BusService, private route: ActivatedRoute,
    private router: Router) {
    route.paramMap.subscribe(p => {
      if (p.has("id")) {
        this.selectedCompteId = Number(p.get("id"))
      }
    })
  }

  ngOnInit(): void {
    this.backendService.getAll(Compte).then(comptes => {
      this.comptes = comptes
      this.miseAJourSoldes()
    })
    this.busService.listen(BusService.LigneSavedEventType).subscribe(() => this.miseAJourSoldes())
    this.busService.listen(BusService.LigneDeletedEventType).subscribe(() => this.miseAJourSoldes())
  }

  private miseAJourSoldes() {
    this.comptes.forEach(c => {
      this.backendService.getSoldeByCompte(c).then((solde: any) => {
        this.soldes[c.id] = solde
      })
    })
  }

  onAjouterCompte() {
    this.busService.emit(BusService.EditionCompteEventType, new Compte())
  }

  onEditerCompte(compte: Compte) {
    this.busService.emit(BusService.EditionCompteEventType, compte)
  }

  onCompteSelected(compte: Compte) {
    this.router.navigate(["/compte", { id: compte.id }])
  }

}
