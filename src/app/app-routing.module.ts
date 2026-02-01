import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnhancedKeyboardComponent } from './components/enhanced-keyboard/enhanced-keyboard.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainPageV2Component } from './components/main-page-v2/main-page-v2.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { CallbackComponentComponent } from './components/callback-component/callback-component.component';

const routes: Routes = [
{
  path: '',
  title: 'Blink AI',
  component: MainPageV2Component
},
{
  path: 'profile',
  title: 'Blink AI - Patient Profile',
  component: ProfileFormComponent
},
{ path: 'callback', component: CallbackComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
