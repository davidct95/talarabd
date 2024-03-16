import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Router } from '@angular/router';
import { BdserviceService } from '../../services/bdservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';


@Component({
  selector: 'app-tabla-componentes',
  templateUrl: './tabla-componentes.component.html'
})
export class TablaComponentesComponent implements OnInit {

  @Output() datoEmitido = new EventEmitter<string>();

  componentes!: any[];
  seccion: any = {
    dai_01: { rangoIndices: [14, 15, 16, 17, 18, 19, 20, 21, 22] }
  }

  currentPage!: number;
  maxPagination: number = 10;
  mostrarModal: boolean = false;

  selectedComponentId: string | null = null;

  constructor(private bdservices: BdserviceService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit(): void {

    this.currentPage = 1;

    this.bdservices.getComponente()
      .subscribe((resp) => {
        this.componentes = resp;

        const jsonOrdenado = this.componentes.sort(function (a, b) {
          const componenteA = a.componente.toLowerCase();
          const componenteB = b.componente.toLowerCase();
        
          if (componenteA < componenteB) { return -1; }
          if (componenteA > componenteB) { return 1; }
          return 0;
        });

        console.log(jsonOrdenado);

      });

    this.route.params.subscribe((params: Params) => {
      this.activarTablaPropiedades();
    })

  }

  activarTablaPropiedades() {
    //Emito el valor para que se active los valores de la tabla de propiedades
    this.datoEmitido.emit(this.seccion['dai_01']);
  }

  actualizarURL(nuevoValor: string) {
    // Obtiene la URL actual y agrega el parámetro 'id' con el nuevo valor
    const url = this.router.url.split('?')[0]; // Obtiene la URL sin los parámetros actuales
    this.router.navigate([url], { queryParams: { id: nuevoValor }, queryParamsHandling: 'merge' });
  }

  pageChange(event: number) {
    this.currentPage = event;
  }

  openModal(componente: any): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '250px',
      data: { componente: componente }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectComponent(componentId: string) {
    this.selectedComponentId = componentId;
}
}
