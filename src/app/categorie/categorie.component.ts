import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../../../comptes_api/lib/esm';
import { BackendService } from '../services/backend.service';
import { BusService } from '../services/bus/bus.service';

@Component({
  selector: 'c-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.sass']
})
export class CategorieComponent implements OnInit {

  fCategories: Categorie[] = []
  cCategories: Categorie[] = []
  eCategories: Categorie[] = []

  constructor(private backendService: BackendService, private busService: BusService) {
    backendService.getAll(Categorie)
      .then(categories => categories.filter(c => c.children.length > 0).sort((c1, c2) => c1.name.localeCompare(c2.name)))
      .then(categories => {
        this.fCategories = categories.filter(c => c.type === "FIXE")
        this.cCategories = categories.filter(c => c.type === "COURANTE")
        this.eCategories = categories.filter(c => c.type === "EXCEPTIONNELLE")
      })
  }

  ngOnInit(): void {
  }

}
