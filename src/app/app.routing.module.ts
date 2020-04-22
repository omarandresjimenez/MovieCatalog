import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'container',
      loadChildren: () => import('./pages/container/container.module').then((m) => m.ContainerModule),
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
