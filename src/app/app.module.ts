import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { PeliculasService } from './services/peliculas.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
