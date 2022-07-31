import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrlRegion: string = 'https://restcountries.com/v2/regionalbloc';

  get httpParams(){
    return new HttpParams().set( 'fields', 'name,capital,alpha2code,flags,population,cca2' )
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ termino }`
    return this.http.get<Country[]>( url, { params: this.httpParams} );

  }

  buscarCapital( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ termino }`
    return this.http.get<Country[]>( url, { params: this.httpParams} );

  }
  getPaisPorAlpha( termino: string ): Observable<Country> {

    const url = `${ this.apiUrl }/alpha/${ termino }`
    return this.http.get<Country>( url );

  }

  buscarRegion( region: string ): Observable<Country[]> {

    const url = ` ${this.apiUrlRegion}/${region}`
    return this.http.get<Country[]>( url, { params: this.httpParams} )
            .pipe(
              tap(console.log)
            )
  }

}
