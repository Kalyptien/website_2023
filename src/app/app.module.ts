import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './PF_component/header/header.component';
import { ArtComponent } from './PF_component/art/art.component';
import { FooterComponent } from './PF_component/footer/footer.component';
import { ProgComponent } from './PF_component/prog/prog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CVComponent } from './cv/cv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArtComponent,
    FooterComponent,
    ProgComponent,
    PortfolioComponent,
    CVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
