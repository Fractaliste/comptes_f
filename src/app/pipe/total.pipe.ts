import { Pipe, PipeTransform } from '@angular/core';
import { Ligne } from '../../../../comptes_api/lib/esm';
import Big from 'big.js';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(lignes: Ligne[]): Big | undefined {

    if (lignes.length === 0) {
      return undefined
    }

    let sum = lignes
      .map(l => new Big(l.valeur))
      .reduce((prev: Big, current: Big) =>
        prev.plus(current), new Big(0))

    return sum

  }

}
