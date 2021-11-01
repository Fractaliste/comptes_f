import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BusService } from 'src/app/services/bus/bus.service';
import { Categorie, Ligne } from '../../../../../../comptes_api/lib/esm';

@Component({
  selector: 'c-ligne-edition',
  templateUrl: './ligne-edition.component.html',
  styleUrls: ['./ligne-edition.component.sass']
})
export class LigneEditionComponent {

  @Input()
  ligne!: Ligne
  categories: Categorie[] = []

  constructor(private eventBus: BusService, private backendService: BackendService) {
    backendService.getAll(Categorie)
      .then(c => this.categories = c)
  }

  onCategorieChange(catName: string) {

    console.log(this.categories.find(c => c.name === catName));

  }
  onTierChange(tierName: string) {

  }

}
