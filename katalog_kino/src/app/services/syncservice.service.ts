import { CokieStatus, VisitResult } from './../../Entities/entities';
import { TranslationService } from './../Translation/TranslationService';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable, scan } from 'rxjs';
import { BooksResponse, Candidate, CandidateResult, Credentials, CredentialsResponse, CustomerResult, Locale, Location, LoginResult, MessageDTO, MessageResult, MyUser, MyUserDTO, Photo, Preferences, RegistrationRequest, ServiceMessage, Session } from '../../Entities/entities';
/* import { constants } from '../Constants/constants'; */
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class Syncservice {



  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,

    private translateService: TranslateService,
  
  ) {


  }
  localeBS = new BehaviorSubject<Locale>(null)
  localeOBS = this.localeBS.asObservable()

  private apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';
  private apiKey = '1da6775f-d4b5-4c8a-8130-1cf3cc09a7b9';

 

  private snackbarQueue: { message: string, duration: number | null }[] = [];
  private currentSnackbar = null;

  

  private currentTheme: string = 'dark';

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }
  isDarkTheme() {
    let isdark = this.currentTheme === 'dark'
    return isdark
  }

  searchMovies(keyword: string, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?keyword=${encodeURIComponent(keyword)}&page=${page}`;
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'X-API-KEY': this.apiKey,
    });

    return this.http.get(url, { headers });
  }
 
  getlocale() {
    if (this.locale === 'ru')
      return Locale.Ru
    if (this.locale === 'en')
      return Locale.En
    else
      return Locale.En

  }
 
 
  private processQueue() {
    if (this.snackbarQueue.length > 0) {
      const { message, duration } = this.snackbarQueue.shift();
      const ok = duration === null ? 'Ok' : null;

      this.currentSnackbar = this._snackBar.open(message, ok, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: duration
      });

      this.currentSnackbar.afterDismissed().subscribe(() => {
        this.currentSnackbar = null;
        this.processQueue();
      });
    }
  }
 
 

  truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + '…';
    }
  }
  checklocale() {
    let lang = this.translateService.getBrowserLang()
    console.log("lang  = " + lang)


    if (lang === 'ru') {
      this.locale = 'ru'
      this.localeBS.next(Locale.Ru)
        /*             localStorage.setItem('locale', this.locale)
         */            console.log("локаль русская = " + this.locale)

    } else /* if (this.locale === 'en-US')  */ {
      this.locale = 'en'
      this.localeBS.next(Locale.En)
      console.log("локаль нерусская = " + this.locale)
      /*             localStorage.setItem('locale', this.locale)
       */
    }

    this.translateService.use(this.locale);


    return this.locale
  }

}

