import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte, Releve } from '../../../../comptes_api/lib/esm';
import { BackendService } from '../services/backend.service';
import { BusService } from '../services/bus/bus.service';

@Component({
  selector: 'c-rapprochement',
  templateUrl: './rapprochement.component.html',
  styleUrls: ['./rapprochement.component.sass']
})
export class RapprochementComponent implements OnInit {

  lastDate?: Date
  lastSolde?: number

  constructor(private eventBus: BusService, private backendService: BackendService, private activatedRoute: ActivatedRoute, private router: Router) { 

    activatedRoute.paramMap.subscribe(p => {
      const compteId = p.get("compteId")
      if(compteId){
        backendService.getReleveByCompte(compteId)
        .then(releve => {
          if(releve) {
            this.lastDate = releve.date
            this.lastSolde = releve.solde
          } else {
            backendService.get(compteId, Compte).then(compte => {
              this.lastSolde = compte.soldeInitial
            })
          }


          console.log("Got releve", releve);
          
        } )
      }
    })
  }

  ngOnInit(): void {
  }

}
