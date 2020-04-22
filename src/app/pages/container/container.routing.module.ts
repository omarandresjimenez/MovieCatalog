import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { UserContainerComponent } from '../user/user.container.component';
import { CatalogComponent } from '../catalog/catalog.component';


const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [
    {
      path: 'users',
      component: UserContainerComponent,
    },
    {
      path: 'catalog',
      component: CatalogComponent,
    },
   { path: '', redirectTo: 'catalog', pathMatch: 'full' },
 ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
