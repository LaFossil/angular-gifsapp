import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
/* Primera version
  //Decorador @ViewChild, dentro de parentesis ponemos el nombre que queremos buscar 'txtBuscar', lo inicializamos a any,
  //Cuando sabemos que es ElementRef da error de que puede ser nulo, asi que colocamos admiración, !:, es el operador 'non-null assertion',
  //operador para asegurarse que el objeto no es nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef;

  buscar( termino: string){
    console.log(termino);
      //En javascript puro, borrar el input, sería: document.querySelector('input').value = '';
    console.log(this.txtBuscar); //Es un ElementRef,
  }
  */
 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //Para usar el servicio tenemos que inyectarlo,
  constructor( private gifsService: GifsService){}


  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    if(valor.trim().length === 0) {
      return;
    }
    //usamos el metodo del servicio
    this.gifsService.buscarGifs( valor );
    //Lo queremos borrar,
    this.txtBuscar.nativeElement.value = '';
  }

}
