import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BudgetComponent } from './budget/budget.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CompteComponent } from './compte/compte.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'categorie', component: CategorieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
