import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Ligne } from '../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.sass']
})
export class LivreComponent implements OnInit {

  lignes: Ligne[] = []
  selectedLine: Ligne;

  constructor(private backendService: BackendService, private busService: BusService) {
    backendService.getLignesByCompte(2).then(lignes => this.lignes = lignes)
    this.selectedLine = new Ligne()
  }

  ngOnInit(): void {
  }

  lineClicked(l: Ligne) {
    this.selectedLine = l
    console.log("clicked",this.selectedLine);
    
  }

}
