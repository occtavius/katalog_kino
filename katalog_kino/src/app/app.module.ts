import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseAmovieComponent } from './Profile/chooseAmovie/chooseAmovie.component';
import { MovieComponent } from './Profile/movie/movie.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
 
import {DeckGL} from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from './Translation/MissingTranslationService';
import { TranslationService } from './Translation/TranslationService';
 
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatNativeDateModule } from '@angular/material/core';
 
 
import {DragDropModule} from '@angular/cdk/drag-drop';
 
import { MatBadgeModule } from '@angular/material/badge';
 

const appRoutes: Routes = [
  /* { path: '', component: ChooseAmovieComponent }, */
  /* { path: '', component: ChooseAbookComponent }, */
  { path: '', component: ChooseAmovieComponent },
  /* { path: 'profile', component: EditprofileComponent },
 
  { path: 'visits', component: VisitsComponent }, */
]
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, ChooseAmovieComponent, MovieComponent, 
        
  ],
  imports: [
    FormsModule , 
    CommonModule,
    FormsModule , 
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
    }),
    MatSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
     
    MatNativeDateModule, DragDropModule,
    MatBadgeModule
  ],
  providers: [
    provideAnimationsAsync(),
    MatDatepickerModule,  
    MatNativeDateModule  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
