import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BdserviceService } from '../../services/bdservice.service';

@Component({
  selector: 'app-tabla-propiedades',
  templateUrl: './tabla-propiedades.component.html',
  styles: [
  ]
})
export class TablaPropiedadesComponent implements OnInit {

  id!: string;
  propiedades!: any[];
  claves! :any;
  valores! :any[];
  seccionActual: any;

  constructor(private route: ActivatedRoute, private bdserviceService: BdserviceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.bdserviceService.getPropiedades(this.id)
        .subscribe(resp => {
          this.propiedades = resp;
          this.claves = Object.keys(this.propiedades);
          this.valores = Object.values(this.propiedades);
        });
    });
  }

  onRegistroSeleccionado(seccionActual: any){
    this.seccionActual = seccionActual
  }
}
