import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { CVComponent } from './cv/cv.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'curriculum', component: CVComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
