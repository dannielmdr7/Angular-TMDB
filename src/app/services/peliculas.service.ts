import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators'
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  get params() {
    return {
      api_key: '5ea818986c14c38d0b9ccc5b41624765',
      language: 'es-ES',
      page: this.carteleraPage.toString()

    }
  }

  constructor(private http: HttpClient) { }

  getCartelera(): Observable<CarteleraResponse> {
    console.log('Cargando API');
    if (this.cargando) {
      return;
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto }
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    );

  }
  getDetallePelicula(id: string) {
    return this.http.get<MovieResponse>(` ${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id: string) {
    return this.http.get<CreditsResponse>(` ${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    );
  }

}
