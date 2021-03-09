import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = document.documentElement.scrollTop + 1200;
    const max = document.documentElement.scrollHeight;
    if (pos > max) {
      if (this.peliculasService.cargando) { return; }
      this.peliculasService.getCartelera().subscribe(resp => {
        this.movies.push(...resp.results);
      })

    }


  }

  constructor(private peliculasService: PeliculasService) { }
  ngOnInit(): void {
    this.peliculasService.getCartelera()
      .subscribe(resp => {
        this.movies = resp.results;
        this.moviesSlideShow = resp.results;


      })
  }
  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();

  }

}
