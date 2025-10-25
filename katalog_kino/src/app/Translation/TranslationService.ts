import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, map } from 'rxjs';

@Injectable()

export class TranslationService {
    
  private translations: any;

  constructor(private http: HttpClient) {
      // Загрузка переводов с использованием HttpClient
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient]
        }
      });
    }

    loadTranslations(): Observable<void> {
      return this.http.get<any>('assets/translations.json').pipe(
        map(translations => {
          this.translations = translations;
        })
      );
    }
    
  }