import { Injectable } from '@angular/core';
import { Compte } from '../../../../comptes_api/lib/esm';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  save<T extends object>(entity: T) {
    const className = entity.constructor.name.toLocaleLowerCase()
    return fetch("/api/" + className,
      { method: "POST", body: JSON.stringify(entity), headers: { "Content-Type": "application/json" } })
      .then(res => {
        console.log("res", res);
      })
  }

  getAll<T>(clazz: { new(): T }): Promise<T[]> {
    return fetch("/api/" + clazz.name.toLocaleLowerCase())
      .then(res => res.json())
      .then((jsonArray: T[]) => {
        return jsonArray.map(item => Object.setPrototypeOf(item, clazz.prototype))
      })
      .then(json => {
        // console.log("json", json);
        return json
      })
  }

}
