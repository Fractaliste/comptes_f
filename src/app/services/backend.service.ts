import { Injectable } from '@angular/core';
import { Compte } from '../../../../comptes_api/lib/cjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  saveCompte(compte: Compte) {
    return fetch("/api/compte", { method: "POST", body: JSON.stringify(compte), headers: { "Content-Type": "application/json" } })
      .then(res => {
        console.log("res", res);
      })
  }

  getComptes() {
    return fetch("/api/compte")
    .then(res => res.json())
  }
}
