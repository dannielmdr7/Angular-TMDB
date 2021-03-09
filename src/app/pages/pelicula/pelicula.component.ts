import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    combineLatest([
      this.peliculasService.getDetallePelicula(id),
      this.peliculasService.getCast(id)

    ]).subscribe(([pelicula, cast]) => {
      console.log(pelicula, cast);
      this.pelicula = pelicula;
      this.cast = cast;
    });

  }
  onRegresar() {
    this.location.back();
  }

}
