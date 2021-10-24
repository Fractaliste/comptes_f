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
      .subscribe(message => {
        console.error("Message reçu", message);
        this.message = message
      })
  }

  ngOnInit(): void {
  }

  hasMessage() {
    return Boolean(this.message)
  }

}
