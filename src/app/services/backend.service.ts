import { Injectable } from '@angular/core';
import { Categorie, Compte } from '../../../../comptes_api/lib/esm';
import { BusService } from './bus/bus.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private busService: BusService) { }

  private _fetch(path: string, method: "GET" | "POST" | "DELETE", body?: object): Promise<any> {
    const params: RequestInit = { method: method, headers: { "Content-Type": "application/json" } }
    if (body) {
      params.body = JSON.stringify(body)
    }

    return fetch(path, params)
      .then(res => {
        if (!res.ok) {
          console.error("Erreur réseau", res)
          this.busService.emit(BusService.ErrorMessageEventType, "Erreur réseau lors de l'appel " + path)
        }
        return res.json()
      }).catch(error => {
        console.error("Erreur applicative", error)
        this.busService.emit(BusService.ErrorMessageEventType, "Erreur applicative lors de l'appel " + path)
      }).then(json => {
        console.debug("Path %s give", path, json);
        return json
      })
  }

  save<T extends object>(entity: T, clazz: { new(): T }): Promise<any>;

  save<T extends object>(entity: T): Promise<any>;

  save<T extends object>(entity: T, clazz?: { new(): T }): Promise<any> {
    let endpoint: string
    if (clazz) {
      endpoint = clazz.name.toLocaleLowerCase()
    } else {
      endpoint = entity.constructor.name.toLocaleLowerCase()
    }

    return fetch("/api/" + endpoint,
      { method: "POST", body: JSON.stringify(entity), headers: { "Content-Type": "application/json" } })
      .then(res => {
        if (!res.ok) {
          this.busService.emit(BusService.ErrorMessageEventType, "Erreur lors de la sauvegarde")
        }
      })
      .catch((error) => {
        this.busService.emit(BusService.ErrorMessageEventType, "Erreur lors de la sauvegarde")
      })
  }

  getAll<T>(clazz: { new(): T }): Promise<T[]> {
    return this._fetch("/api/" + clazz.name.toLocaleLowerCase(), "GET")
      .then((jsonArray: T[]) => {
        return jsonArray.map(item => Object.setPrototypeOf(item, clazz.prototype))
      })
  }


  safeDeleteCategorie(categorie: Categorie) {
    return this._fetch("/api/categorie", "DELETE", categorie)
  }

  /**
   * getLignesByCompte
      */
  public getLignesByCompte(compte: Compte | number) {
    return this._fetch("/api/ligne/" + (compte instanceof Compte ? compte.id : compte), "GET")
  }

}
