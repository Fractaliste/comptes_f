import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap'

@Component({
  selector: 'c-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.sass']
})
export class ListeComponent implements OnInit {

  popupId = "addCompteId"

  constructor() { }

  ngOnInit(): void {
  }

  onAjouterCompte() {
    const element = document.getElementById(this.popupId)
    if (element) {
      var myModal = new Modal(element)
      myModal.show()
    }

  }

}
