import { Pipe, PipeTransform } from '@angular/core';
import Big from 'big.js';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(value: Big | number | undefined): string {
    if (value === undefined) {
      return "--,--"
    }

    let n: number
    if (value instanceof Big) {
      n = value.div(100).toNumber()
    } else {
      n = value /100
    }

    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
      .format(n);
  }

}
