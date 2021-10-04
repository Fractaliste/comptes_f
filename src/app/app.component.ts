import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'c-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  tabs = ["accueil", "comptes", "budget"]
  selected = this.tabs[0]

  constructor(router: Router) {
    // Maj de la tabulation selected
    router.events.pipe(filter(ev => ev instanceof NavigationEnd)).subscribe(event => {
      const ev = event as NavigationEnd
      this.selected = ev.urlAfterRedirects.replace("/", "")

    })
  }
}
