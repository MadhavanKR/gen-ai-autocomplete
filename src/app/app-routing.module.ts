import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnhancedKeyboardComponent } from './components/enhanced-keyboard/enhanced-keyboard.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

const routes: Routes = [{
  path: 'v2',
  title: 'New Keyboard',
  component: EnhancedKeyboardComponent
},
{
  path: '',
  title: 'Old Keyboard',
  component: MainLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
