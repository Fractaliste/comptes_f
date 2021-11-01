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
    const refreshCllbk = () => backendService.getAll(Categorie)
      .then(categories => categories.filter(c => c.children.length > 0).sort((c1, c2) => c1.name.localeCompare(c2.name)))
      .then(categories => {
        this.fCategories = categories.filter(c => c.type === "FIXE")
        this.cCategories = categories.filter(c => c.type === "COURANTE")
        this.eCategories = categories.filter(c => c.type === "EXCEPTIONNELLE")
      })

    busService.listen(BusService.CategorieRefreshEventType).subscribe(() => {
      this.fCategories.splice(0, this.fCategories.length)
      this.cCategories.splice(0, this.cCategories.length)
      this.eCategories.splice(0, this.eCategories.length)
      refreshCllbk()
    })
    refreshCllbk()
  }

  ngOnInit(): void {
  }


  onAjouterCategorie(categorieMere: Categorie) {
    const c = new Categorie()
    c.parent = categorieMere
    c.type = categorieMere.type
    this.busService.emit(BusService.EditionCategorieEventType, c)
  }

  onEditerCategorie(categorie: Categorie) {
    this.busService.emit(BusService.EditionCategorieEventType, categorie)
  }

  onSupprimerCategorie(categorie: Categorie) {
    this.backendService.safeDeleteCategorie(categorie).then(() => this.busService.emit(BusService.CategorieRefreshEventType))
  }

}
