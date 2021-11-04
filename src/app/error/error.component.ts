import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus/bus.service';

@Component({
  selector: 'c-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  message?: string

  constructor(busService: BusService) {
    busService.listen(BusService.ErrorMessageEventType)
      .subscribe(erreur => {
        if (erreur instanceof Error) {
          this.message = erreur.message
        } else {
          this.message = erreur
        } 
        console.error("Erreur catched", erreur);
        setTimeout(() => this.message = undefined, 5000)
      })
  }

  ngOnInit(): void {
  }

  hasMessage() {
    return Boolean(this.message)
  }

}
