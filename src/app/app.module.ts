import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ComptesComponent } from './comptes/comptes.component';
import { BudgetComponent } from './budget/budget.component';
import { LivreComponent } from './comptes/livre/livre.component';
import { ListeComponent } from './comptes/liste/liste.component';
import { PopupComponent } from './popup/popup.component';
import { EditionComponent } from './comptes/liste/edition/edition.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ComptesComponent,
    BudgetComponent,
    LivreComponent,
    ListeComponent,
    PopupComponent,
    EditionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
