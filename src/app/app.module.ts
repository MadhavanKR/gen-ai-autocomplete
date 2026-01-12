import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { EnhancedKeyboardComponent } from './components/enhanced-keyboard/enhanced-keyboard.component';
import { RouterModule } from '@angular/router';
import { HoverClickDirective } from './directives/hover-click.directive';
import { MainPageV2Component } from './components/main-page-v2/main-page-v2.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CallbackComponentComponent } from './components/callback-component/callback-component.component';
import { ProfilePersonaComponentComponent } from './components/profile-persona-component/profile-persona-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    EnhancedKeyboardComponent,
    HoverClickDirective,
    MainPageV2Component,
    ProfileFormComponent,
    CallbackComponentComponent,
    ProfilePersonaComponentComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
