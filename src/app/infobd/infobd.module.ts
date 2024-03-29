import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaPropiedadesComponent } from './components/tabla-propiedades/tabla-propiedades.component';
import { TablaComponentesComponent } from './components/tabla-componentes/tabla-componentes.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BotonePropiedadesComponent } from './components/botone-propiedades/botone-propiedades.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [
    TablaComponentesComponent,
    TablaPropiedadesComponent,
    PrincipalComponent,
    BotonePropiedadesComponent,
    ModalEditComponent,
    MapaComponent
  ],
  exports: [
    TablaComponentesComponent,
    TablaPropiedadesComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    FormsModule 
  ]
})
export class InfobdModule { }
