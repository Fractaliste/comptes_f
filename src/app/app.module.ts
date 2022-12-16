import { LOCALE_ID, NgModule, ErrorHandler as AngularErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CompteComponent } from './compte/compte.component';
import { BudgetComponent } from './budget/budget.component';
import { LivreComponent } from './compte/livre/livre.component';
import { ListeComponent } from './compte/liste/liste.component';
import { PopupComponent } from './popup/popup.component';
import { CompteEditionComponent } from './compte/edition/compte-edition.component';
import { FormsModule } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { BusService } from './services/bus/bus.service';
import { ErrorComponent } from './error/error.component';
import { LigneEditionComponent } from './compte/livre/ligne-edition/ligne-edition.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieEditionComponent } from './categorie/categorie-edition/categorie-edition.component';
import { ErrorHandler } from './error/error-handler';
import { TotalPipe } from './pipe/total.pipe';
import { EuroPipe } from './pipe/euro.pipe';
import { RapprochementComponent } from './rapprochement/rapprochement.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CompteComponent,
    BudgetComponent,
    LivreComponent,
    ListeComponent,
    PopupComponent,
    CompteEditionComponent,
    ErrorComponent,
    LigneEditionComponent,
    CategorieComponent,
    CategorieEditionComponent,
    TotalPipe,
    EuroPipe,
    RapprochementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    BusService
    , BackendService
    , { provide: LOCALE_ID, useValue: 'fr-FR' }
    , { provide: AngularErrorHandler, useClass: ErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
