import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LetterCardsComponent } from './components/letter-cards/letter-cards.component';
import { WordCardsComponent } from './components/word-cards/word-cards.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CustomCardsComponent } from './components/custom-cards/custom-cards.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LetterCardsComponent,
    WordCardsComponent,
    PredictionResultComponent,
    CustomCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
