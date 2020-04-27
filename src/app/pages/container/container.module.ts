
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container.routing.module';
import { HeaderComponent } from '../header/header.component';


import { UserFormComponent } from '../user/UserForm/user-form/user-form.component';
import { UserListComponent } from '../user/UserList/user-list/user-list.component';
import { CardMovieComponent } from '../catalog/components/cardMovie/card-movie.component';
import { SearchbarComponent } from '../catalog/components/searchbar/searchbar.component';
import { ContainerComponent } from './container.component';
import { UserContainerComponent } from '../user/user.container.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { TruncatePipe } from 'src/app/share/pipes/limitTo.pipe';
import { ModalComponent } from '../catalog/components/modal/modal.component';



@NgModule({
  declarations: [
    ContainerComponent,
    UserContainerComponent,
    HeaderComponent,
    UserFormComponent,
    UserListComponent,
    CatalogComponent,
    CardMovieComponent,
    SearchbarComponent,
    ModalComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class ContainerModule { }
