import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'GYxBLBnh4rtali9MLntEk8GrwJfahSrc';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]= [];

  //TODO Cambiar any por su tipo correspondiente
  //public resultados: any[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  //El constructor solo se ejecuta la primera vez que se llama
  constructor(private http: HttpClient) {
    //Recuperar lo guardado en LocalStorage
    //localStorage.getItem('historial');
    /* if(localStorage.getItem('historial')){
      //JSON.parse toma un objeto serializado mediante el stringify y lo va a retornar a lo que originalmente era: objeto o arreglo,string o primitivos
      this._historial = JSON.parse(localStorage.getItem('historial')! ); //Con la admiración nos deja excepcionar que no estamos incluyendo el null
    } */
    //Nos ahorramos el if, si en caso de no haber nada devolvemos un array vacio:
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  //Hay que llamarlo desde nuestro componente de busqueda
  buscarGifs( query: string){

    query = query.trim().toLowerCase();
    if( !this._historial.includes(query)){
      this._historial.unshift(query); //Insertar al inicio
      this._historial = this._historial.splice(0,10); 
      
      //Grabar en LocalStorage
      //localStorage.setItem('historial', query);
      //JSON.stringify convierte cualquier objeto y lo convierte a string
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }
 
    console.log(this._historial);

    /* carpinteria fetch, para ver funcionamiento javascript (es una Promesa --> .then())
    fetch('https://api.giphy.com/v1/gifs/search?api_key=GYxBLBnh4rtali9MLntEk8GrwJfahSrc&q=cheeseburgers&limit=10')
    .then( resp => {
      resp.json().then(data => {
        console.log(data);
      })
    });
    */

    //`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`
    const params = new HttpParams()
                    .set('api_key', this.apiKey)
                    .set('limit', '10')
                    .set('q', query);
    //console.log(params.toString());

    //La peticion del modulo http retorna un Observable (Observable --> .subscribe())
    //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=GYxBLBnh4rtali9MLntEk8GrwJfahSrc'&q=${ query }&limit=10`)
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
      .subscribe( (resp: any) => {
        //console.log( resp.data );
        this.resultados = resp.data;
        //guardar imagenes cuando tengo la respuesta
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  
}
