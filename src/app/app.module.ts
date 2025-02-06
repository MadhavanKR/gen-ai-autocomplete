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
import { provideHttpClient } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { EnhancedKeyboardComponent } from './components/enhanced-keyboard/enhanced-keyboard.component';
import { RouterModule } from '@angular/router';

@NgModule({ declarations: [
        AppComponent,
        MainLayoutComponent,
        EnhancedKeyboardComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [RouterModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatChipsModule,
        MatSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
