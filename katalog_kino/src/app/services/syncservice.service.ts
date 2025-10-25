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
    /* private translationService: TranslationService */
  ) {

    // Now candidatesObs is a direct observable of the candidates BehaviorSubject
    this.candidatesObs = this.candidates.asObservable();


  }

  private apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';
  private apiKey = '1da6775f-d4b5-4c8a-8130-1cf3cc09a7b9';

  private bookapiKey = ''; // Замените на ваш API ключ
  private bookapiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private serverurl = 'http://localhost:8080/'
  registerUrl = 'websignin/easyregister'
  updateprofileUrl = 'updateprofile'
  updatetokenURL = '/updatetoken'
  getcandidates = 'getcandidates'
  getdetails = '/getdetails'
  getMessages = '/getMessages'
  saveMessage = '/saveMessage'
  saveMessages = '/saveMessages'
  getdialogues = '/getdialogues'
  savesession = '/savesession'
  getcustomers = 'getcustomers'
  logout = '/logout'
  countunread = '/countunread'
  getvisits = '/getvisits'

  private snackbarQueue: { message: string, duration: number | null }[] = [];
  private currentSnackbar = null;

  myprofile: MyUser = new MyUser()
  userProfile = new BehaviorSubject<MyUser>(this.myprofile)
  userProfileOBS = this.userProfile.asObservable()

  candidates = new BehaviorSubject<Candidate[]>([])
  candidatesObs = this.candidates.asObservable()
  candidatesResult = new BehaviorSubject<CandidateResult>(new CandidateResult())
  candidatesResultObs = this.candidatesResult.asObservable()
  dialogues = new BehaviorSubject<Candidate[]>([])
  dialoguesObs = this.dialogues.asObservable()


  dialoguesResult = new BehaviorSubject<CandidateResult>(new CandidateResult())
  dialoguesResultObs = this.dialoguesResult.asObservable()


  credentials = new BehaviorSubject<Credentials>(undefined)
  credentialsObs = this.credentials.asObservable()
  localeBS = new BehaviorSubject<Locale>(null)
  localeOBS = this.localeBS.asObservable()
  scrollingOrTouching = new BehaviorSubject<boolean>(false)
  scrollingOrTouchingBS = this.scrollingOrTouching.asObservable()
  session: Session = undefined
  sessionBS = new BehaviorSubject<Session>(this.session)
  sessionOBS = this.sessionBS.asObservable()

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

  getBooks(query: string): Observable<BooksResponse> {
    const params = new HttpParams().set('q', query);
    return this.http.get<BooksResponse>(this.bookapiUrl, { params });
  }



  registerWithEmail(email: string, telegram: string, referer: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
/*         console.log('метод registerWithEmail с email = ' + email)
*/        let request = new RegistrationRequest()

    request.email = email
    request.telegram = telegram
    request.password = 'Emptyemptyemptyempty1234!@#$'
    request.locale = this.getlocale()
    if (referer)
      request.referer = referer
    else
      request.referer = 'n/a'
    /*         console.log('метод registerWithEmail с request = ' + JSON.stringify(request))
     */        /* websignin/easyregister  */

    /*     if (!this.amionline("Cannot connect")) {
    
            this.loadingInProgressBS.next(false)
            return
        } */

    /* this.checkrr(request, 'регистрация через телегу ') */
    /* let isspam = this.antispamIsActive()
    if (!isspam) */
    const message = this.translate("Connecting to server")
    this.showSnackBar(message, 2000)

    this.http.post(this.serverurl + this.registerUrl, request, { headers: headers }).subscribe((res: ServiceMessage) => {
      /* if (res.hasOwnProperty('text')) */
      console.log(res.text)
      /* let message = this.translateservermessage(res) */
      let message = res.text
      message = this.translate(message)
      this.showSnackBar(message, 5000)
      /* this.welcomemeassage.next(message) */
    },
      (error) => {
        let message = error.message;
        /* this.showSnackBar(this.translate("Sync error") + message, 3000) */

        /* this.showSnackBar(message, 6000); */
      }

    )
  }



  async updateMyProfileOnServer(user: MyUser) {
    console.log('ЗАпрос на сервер ')
    /* if( this.loggedIn.getValue()) */

    /* this.loadingInProgressBS.next(true) */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    /* this.loadFriends()
    await this.loadAllmytasks() */

    /* this.checksync(this.commonListBS.value, 'syncuser start') */


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)

    /* this.checkuserlocale(user, 'до синхронизации') */

    /*  this.checkuser(user) */



    /* await this.loadAllmytasks() */


    let body = {}
    if (user) {
      user = this.fixLocale(user)
      body = user
    }
    let text = JSON.stringify(body)
    console.log('Запрос на сервер = ' + text)
    this.http.post(this.serverurl + this.updateprofileUrl, body, {

      headers: headers,
      params: {
        /* token: creds.token, */
        email: creds.email
      },    withCredentials: true


    })

      .subscribe(async (res: MyUserDTO) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        console.log('Ответ сервера  res.loginresult = ' + res.loginResult)
       
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(loginOk)
        this.userProfile.next(res.innerUserDTO)
       /*  const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
        if (!toomany) {
          console.log('toomany = ' + toomany)

          this.userProfile.next(res.innerUserDTO)
        }
        else {
          const message = this.translate("Too many requests from you!")
          this.showSnackBar(message, 3000)
        } */

        /* this.handleLoginResult(res); */
        if(!loginOk) return undefined
        if (res.innerUserDTO)
          this.startCommonSession(res.innerUserDTO)
        return res
      },
        (error: HttpErrorResponse) => {
          // 1. Получаем текст ошибки из error.error (это строка, а не объект!)
          let text = JSON.stringify(error)
          console.log('Server errorresponse: ', text);

          
         /*  const errorMessage = error.error || 'Unknown error occurred'; */

          // 2. Логируем или показываем пользователю
    /*       console.error('Server status:', error.status);
          console.error('Server errorMessage:', errorMessage); */
          // 3. Возвращаем null или обрабатываем ошибку
          return null;
        }
      )
  }

  private handleLoginResult(res: MyUserDTO) {
    const loginfailed = this.loginResultsEqual(res.loginResult, LoginResult.Failure) ||
      this.loginResultsEqual(res.loginResult, LoginResult.LoggedOut) ||
      this.loginResultsEqual(res.loginResult, LoginResult.TokenExpired);

    if (loginfailed)
      this.clearCredentials();
  }

  isLoginResultOk(result: LoginResult) {
    if (! result )
        return true
    else {
        if (this.loginResultsAreEqual(result , LoginResult.Cooldown)) {
            this.showSnackBar("Anti-brutforce cooldown. Try again in 10 sec.", 3000)
            
            return false
        }
        if (this.loginResultsAreEqual(result, LoginResult.LoggedOut)) {
            this.showSnackBar("Succesfully logged out", 3000)
            this.clearCredentials();

            return false
        }
        if (this.loginResultsAreEqual(result, LoginResult.Success)) {
            this.showSnackBar("LoginResult.Success", 3000)
            return true
        }
        if (this.loginResultsAreEqual(result, LoginResult.Failure)) {
            this.showSnackBar("Login failure ", 3000)
            this.clearCredentials();

            return false
        }
        if (this.loginResultsAreEqual(result, LoginResult.TokenExpired)) {
            this.showSnackBar("Token expired, need to re-login", 3000)
            this.clearCredentials();

            return false
        }
        if (this.loginResultsAreEqual(result, LoginResult.TooManyRequests)) {
         /*  this.showSnackBar("TooManyRequests", 3000) */
           
          const message = this.translate("Too many requests from you!")
          this.showSnackBar(message, 3000)
          return false
      }
        return false
  
    }
  
  }



  async getUnreadCount(): Promise<number | null> {
    console.log('Запрос на сервер');

    return new Promise<number | null>((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      const creds = this.loadCredentials();
      if (!creds) {
        console.log('Credentials are null. Cannot sync');
        resolve(null);
        return;
      }

      console.log('Запрос на сервер email: ' + creds.email);
      console.log('Запрос на сервер token: ' + creds.token);

      const body = {}; // Пустое тело, если не требуется передавать данные
      const url = `${this.serverurl}${this.updateprofileUrl}${this.countunread}`;

      this.http
        .post<number>(url, body, {
          headers: headers,
          params: {
          /*   token: creds.token, */
            email: creds.email,
          },    withCredentials: true

        })
        .subscribe(
          (res: number) => {
            console.log('Ответ сервера count unread: ' + res);
            resolve(res); // Возвращаем результат через Promise
          },
          (error: HttpErrorResponse) => {
            console.error('Server status:', error.status);
            console.error('Server error:', error.error || 'Unknown error occurred');
            resolve(null); // Возвращаем null в случае ошибки
          }
        );
    });
  }

  async logoutEverywhere() {
    console.log('ЗАпрос на сервер logoutEverywhere ')

    await this.finishSession(this.session)
    /* if( this.loggedIn.getValue()) */

    /* this.loadingInProgressBS.next(true) */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('logoutEverywhere Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)



    let body = {}

    let text = JSON.stringify(body)
    console.log('Запрос на сервер = ' + text)
    this.http.post(this.serverurl + this.updateprofileUrl + this.logout, body, {

      headers: headers,
      params: {
      /*   token: creds.token, */
        email: creds.email,
      },    withCredentials: true,

    })

      .subscribe(async (res: MyUserDTO) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        console.log('Ответ сервера  res.loginresult = ' + res.loginResult)
        /*  const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
         if (!toomany) {
           console.log('toomany = ' + toomany)
 
           this.userProfile.next(res.innerUserDTO)
         }
         else { 
           const message = this.translate("Too many requests from you!")
           this.showSnackBar(message, 3000) 
         } */


 /*        const loginfailed = this.loginResultsEqual(res.loginResult, LoginResult.Failure) ||
          this.loginResultsEqual(res.loginResult, LoginResult.LoggedOut) ||
          this.loginResultsEqual(res.loginResult, LoginResult.TokenExpired)

        if (loginfailed)
          this.clearCredentials() */
          const loginOk= this.isLoginResultOk(res.loginResult)
         


        return res
      },
        (error: HttpErrorResponse) => {
          // 1. Получаем текст ошибки из error.error (это строка, а не объект!)
          const errorMessage = error.error || 'Unknown error occurred';

          // 2. Логируем или показываем пользователю
          console.error('Server status:', error.status);
          console.error('Server errorMessage:', errorMessage);
          // 3. Возвращаем null или обрабатываем ошибку
          return null;
        }
      )
  }

  async getVisitResult(page: number, currentresult: BehaviorSubject<VisitResult>, isloading: boolean) {
    console.log('ЗАпрос на сервер getVisitResult ')


    /* if( this.loggedIn.getValue()) */

    /* this.loadingInProgressBS.next(true) */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('getVisitResult Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)



    let body = {}

    let text = JSON.stringify(body)
    console.log('Запрос на сервер = ' + text)
    this.http.post(this.serverurl + this.updateprofileUrl + this.getvisits, body, {

      headers: headers,
      params: {
      /*   token: creds.token, */
        email: creds.email,
      },    withCredentials: true,

    })

      .subscribe(async (res: VisitResult) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        console.log('Ответ сервера  res.loginresult = ' + res.loginResult)
        /*  const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
         if (!toomany) {
           console.log('toomany = ' + toomany)
 
           this.userProfile.next(res.innerUserDTO)
         }
         else { 
           const message = this.translate("Too many requests from you!")
           this.showSnackBar(message, 3000) 
         } */
         isloading = false
         const loginOk= this.isLoginResultOk(res.loginResult)
         if(loginOk)
    /*      this.userProfile.next(res.innerUserDTO)

        const loginfailed = this.loginResultsEqual(res.loginResult, LoginResult.Failure) ||
          this.loginResultsEqual(res.loginResult, LoginResult.LoggedOut) ||
          this.loginResultsEqual(res.loginResult, LoginResult.TokenExpired)

        if (loginfailed)
          this.clearCredentials() */
        currentresult.next(res)
       
        /* return res */
      },
        (error: HttpErrorResponse) => {
          // 1. Получаем текст ошибки из error.error (это строка, а не объект!)
          const errorMessage = error.error || 'Unknown error occurred';

          // 2. Логируем или показываем пользователю
          console.error('Server status:', error.status);
          console.error('Server errorMessage:', errorMessage);
          // 3. Возвращаем null или обрабатываем ошибку
          isloading = false
          /* return null; */
        }
      )
  }


  async updateSession(session: Session): Promise<Session | null> {
    console.log('Запрос на сервер updateSession');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let creds = this.loadCredentials();
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync');
      return null;
    }

    console.log('Запрос на сервер email ' + creds.email);
    console.log('Запрос на сервер token ' + creds.token);

    let body = session ? session : {};
    const start = JSON.stringify(body)
    console.log('Отправка сессии на сервер ' + start);

    try {
      const res = await this.http.post<Session>(
        `${this.serverurl}${this.updateprofileUrl}${this.savesession}`,
        body,
        {
          headers: headers,
          params: {
          /*   token: creds.token, */
            email: creds.email,
          },    withCredentials: true
        }
      ).toPromise();

      if (res) {
        console.log('Ответ сервера: ' + JSON.stringify(res));
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(loginOk)
        return res;
        else return session
       
       
       /*  const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
        if (toomany) {
          const message = this.translate("Too many requests from you!")
          this.showSnackBar(message, 3000)
          return session
        }
        return res; */
      } else {
        console.log('Пустой ответ от сервера');
        return null;
      }
    } catch (error) {
      const message = error?.error?.message;
      console.log('Ошибка на сервере: ' + message);
      return null;
    }
  }

  async startCommonSession(user: MyUser) {
    if (!user)
      return
    let newsession = this.createSession(user, null)
    if (this.session)
      newsession = this.session
    this.session = await this.updateSession(newsession)
    const now = Date.now()
    console.log('Начата новая сессия ' + this.calculateDuration(this.session.started, now) + " назад");
  }

  async startSession(user: MyUser, visitedProfileId: number) {
    if (!user) {
      console.log('Пустой пользователь, невозможно начать сессию ');
      return undefined
    }
    if (!visitedProfileId) {
      console.log('Просматриваемый профиль пустой, невозможно начать сессию ');
      return undefined
    }
    let newsession = this.createSession(user, visitedProfileId)

    const updated = await this.updateSession(newsession)
    const now = Date.now()
    console.log('Начата новая сессия ' + this.calculateDuration(updated.started, now) + " назад для просмотра профиля = " + updated?.visitedProfileId);
    return updated

  }




  createSession(user: MyUser, visitedProfileId: number) {
    let updatedSession = new Session()
    updatedSession.userid = user.globalid
    updatedSession.started = Date.now()
    updatedSession.visitedProfileId = visitedProfileId
    console.log('создан сессия ' + updatedSession?.visitedProfileId);

    return updatedSession
  }

  async finishSession(session: Session) {
    console.log(' finishSession  ');
    if (!session) {
      console.log(' сессия пустая ');
      return undefined
    }
    session.ended = Date.now()
    const check = JSON.stringify(session)
    console.log("finishSession = " + check);
    const finished = await this.updateSession(session)
    if (finished.ended) {
      let text = "Сессия завершена за " + this.calculateDuration(finished.started, finished.ended) + " профиля пользователя =" + finished.visitedProfileId
      console.log(text);
    }
    return finished
  }


  calculateDuration(startTime: number, endTime: number): string {
    // Проверяем, что конечная временная метка не меньше начальной
    if (endTime < startTime) {
      throw new Error("End time must be greater than or equal to start time");
    }

    // Вычисляем продолжительность в миллисекундах
    const durationMs = endTime - startTime;

    // Преобразуем миллисекунды в другие единицы времени
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Остатки от деления для более точного отображения
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    // Формируем строку с продолжительностью
    let durationString = "";
    if (days > 0) {
      durationString += `${days} days, `;
    }
    if (remainingHours > 0) {
      durationString += `${remainingHours} hours, `;
    }
    if (remainingMinutes > 0) {
      durationString += `${remainingMinutes} minutes, `;
    }
    if (remainingSeconds > 0) {
      durationString += `${remainingSeconds} seconds`;
    }

    // Убираем лишнюю запятую и пробел в конце строки, если они есть
    durationString = durationString.replace(/,\s*$/, "");

    return durationString || "0 seconds";
  }

 
  formatTimestamp(timestamp: number, showSeconds: boolean = false): string {
    // Если timestamp в секундах (например, из Unix time), умножаем на 1000
    const date = new Date(timestamp * (timestamp.toString().length === 10 ? 1000 : 1));

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Форматирование времени (часы:минуты или часы:минуты:секунды)
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: false
    });

    // Форматирование полной даты
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const timeString = timeFormatter.format(date);

    // Проверяем, сегодня ли это
    if (inputDate.getTime() === today.getTime()) {
      return `сегодня, ${timeString}`;
    }
    // Проверяем, вчера ли это
    else if (inputDate.getTime() === yesterday.getTime()) {
      return `вчера, ${timeString}`;
    }
    // Для всех остальных случаев - полная дата
    else {
      const dateString = dateFormatter.format(date);
      return `${dateString}, ${timeString}`;
    }
  }



  async getCandidates(page: number, prefs: Preferences) {
    console.log('ЗАпрос на сервер getCandidates')
    /* if( this.loggedIn.getValue()) */

    /* this.loadingInProgressBS.next(true) */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    /* this.loadFriends()
    await this.loadAllmytasks() */

    /* this.checksync(this.commonListBS.value, 'syncuser start') */


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)

    /* this.checkuserlocale(user, 'до синхронизации') */

    /*  this.checkuser(user) */



    /* await this.loadAllmytasks() */
    let body = {}
    if (prefs)
      body = prefs
    let text = JSON.stringify(body)
    console.log('Запрос на сервер по кандидатам = ' + text)
    this.http.post(this.serverurl + this.getcandidates, body, {
      headers: headers,
      params: {
      /*   token: creds.token, */
        email: creds.email,
        page: page

      },    withCredentials: true


     /*  headers: headers,
      params: {
        token: creds.token,
        email: creds.email,
        page: page
      }, */

    })

      .subscribe(async (res: CandidateResult) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(loginOk)
       { this.candidatesResult.next(res)
        this.addCandidates(res.candidates, this.candidates)}

      },
        (error) => {

          let message = error?.error?.message

          console.log('Error on server =' + message)
        }
      )
  }



  async getDialogues(page: number) {
    console.log('ЗАпрос на сервер getDialogues')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)

    let body = {}

    /* console.log('Запрос на сервер по кандидатам = ' + text) */
    this.http.post(this.serverurl + this.getcandidates + this.getdialogues, body, {

      headers: headers,
      params: {
      /*   token: creds.token, */
        email: creds.email,
        page: page

      },    withCredentials: true


    })

      .subscribe(async (res: CandidateResult) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(!loginOk) return
        this.dialoguesResult.next(res)
        this.addCandidates(res.candidates, this.dialogues)

      },
        (error) => {

          let message = error?.error?.message

          console.log('Error on server =' + message)
        }
      )
  }





  async getDetails(globalid: number) {
    console.log('ЗАпрос на сервер getDetails')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });



    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)

    /* this.checkuserlocale(user, 'до синхронизации') */

    /*  this.checkuser(user) */



    /* await this.loadAllmytasks() */
    let body = {}
    /* if( user)
    body =  user
    let text = JSON.stringify(body)
    console.log('Запрос на сервер = '+text  )  */
    this.http.post(this.serverurl + this.getcandidates + this.getdetails, body, {

      headers: headers,
      params: {
      /*   token: creds.token, */
        email: creds.email,
        globalid: globalid
      },withCredentials: true

    })

      .subscribe(async (res: Candidate) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(!loginOk) return
      /*   const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
        if (toomany) {
          const message = this.translate("Too many requests from you!")
          this.showSnackBar(message, 3000)
          return
        }
 */
        this.updateCandidate(res, this.candidates)
        this.updateCandidate(res, this.dialogues)

      },
        (error) => {

          let message = error?.error?.message

          console.log('Error on server =' + message)
        }
      )
  }


  async getCustomers(page: number, result: BehaviorSubject<CustomerResult>) {
    console.log('ЗАпрос на сервер getCustomers')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер email ' + creds.email)
    console.log('ЗАпрос на сервер token' + creds.token)

    let body = {}

    /* console.log('Запрос на сервер по кандидатам = ' + text) */
    this.http.post(this.serverurl + this.getcustomers, body, {

      headers: headers,
      params: {
        /* token: creds.token, */
        email: creds.email,
        page: page
      },                withCredentials: true


    })

      .subscribe(async (res: CustomerResult) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        const loginOk= this.isLoginResultOk(res.loginResult)
        if(!loginOk) return
        result.next(res)

      },
        (error) => {

          let message = error?.error?.message

          console.log('Error on server =' + message)
        }
      )
  }





  updateCandidate(updatedCandidate: Candidate, candidates: BehaviorSubject<Candidate[]>) {
    const current = candidates.getValue();
    const idx = current.findIndex(c => c.myUserInnerDTO.globalid === updatedCandidate.myUserInnerDTO.globalid);
    if (idx === -1) {
      console.warn('Candidate not found for update:', updatedCandidate);
      return;
    }
    const oldCandidate = current[idx];
    // Сохраняем старый matchCount, обновляем остальные поля
    const newCandidate: Candidate = {
      ...updatedCandidate,
      matchCount: updatedCandidate.matchCount
      , distance: updatedCandidate.distance,
      unreadMessages: updatedCandidate.unreadMessages

    };
    const newArr = [...current];
    newArr[idx] = newCandidate;
    candidates.next(newArr);
    console.log('Candidate updated:', newCandidate);
  }












  addCandidates(newCandidates: Candidate[], candidates: BehaviorSubject<Candidate[]>) {
    if (!newCandidates) return
    const current = candidates.getValue();
    // Create a map for quick lookup of existing candidates by globalid
    const candidateMap = new Map<number, Candidate>();
    current.forEach(c => {
      if (c && c.myUserInnerDTO && c.myUserInnerDTO.globalid !== undefined) {
        candidateMap.set(c.myUserInnerDTO.globalid, c);
      }
    });

    // Merge or add new candidates
    newCandidates.forEach(newC => {
      if (newC && newC.myUserInnerDTO && newC.myUserInnerDTO.globalid !== undefined) {
        const existing = candidateMap.get(newC.myUserInnerDTO.globalid);
        if (existing) {
          let text = " сохраняю distance = " + existing.distance + " для user +" + newC.myUserInnerDTO.email
          console.log(text)
          // Preserve matchCount and distance from the old candidate
          candidateMap.set(newC.myUserInnerDTO.globalid, {
            ...newC,
            matchCount: existing.matchCount,
            distance: existing.distance
          });
        } else {
          candidateMap.set(newC.myUserInnerDTO.globalid, newC);
        }
      }
    });

    // Update the candidates list
    candidates.next(Array.from(candidateMap.values()));
  }



  async getMessagesWithUser(page: number, globalid: number, loading: boolean, resultSubject?: BehaviorSubject<MessageResult>) {
    console.log('ЗАпрос на сервер getMessagesWithUser');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let creds = this.loadCredentials();
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ');
      return;
    }
    console.log('ЗАпрос на сервер email ' + creds.email + ' token= ' + creds.token);

    let body = {};
    this.http.post(this.serverurl + this.getcandidates + this.getMessages, body, {
      headers: headers,
      params: {
        /* token: creds.token, */
        email: creds.email,
        page: page,
        globalid: globalid
      },withCredentials: true
    })
      .subscribe(
        async (res: MessageResult) => {
          let text = JSON.stringify(res);
          const loginOk= this.isLoginResultOk(res.loginResult)
          if(!loginOk) return
         /*  const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
          if (toomany) {
            const message = this.translate("Too many requests from you!")
            this.showSnackBar(message, 3000)
            loading = false
            return
          } */
          console.log('Ответ сервера  ' + text);
          if (resultSubject) {
            for (const message of res.messages) {
              message.synced = true
            }
            resultSubject.next(res);
          }
        },
        (error) => {
          let message = error?.error?.message;
          console.log('Error on server =' + message);
        }
      );
  }


  async updateOrSaveMessage(dto: MessageDTO, sending: boolean): Promise<MessageDTO> {
    console.log('ЗАпрос на сервер updateOrSaveMessage')
    dto.synced = false
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let creds = this.loadCredentials();
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ');
      return Promise.reject('No credentials');
    }
    console.log('ЗАпрос на сервер email ' + creds.email + ' token= ' + creds.token);

    let body = dto ? dto : {};
    let text = JSON.stringify(body);
    console.log('Запрос на сервер = ' + text);

    return this.http.post<MessageDTO>(
      this.serverurl + this.getcandidates + this.saveMessage,
      body,
      {
        headers: headers,
        params: {
          /* token: creds.token, */
          email: creds.email,
        },withCredentials: true
      }
    ).toPromise()
      .then((res: MessageDTO) => {
        let text = JSON.stringify(res);
        console.log('Ответ сервера  ' + text);
        sending = false

        const loginOk= this.isLoginResultOk(res.loginResult)
        if(!loginOk) return dto
       
      /*   const toomany = this.loginResultsEqual(res.loginResult, LoginResult.TooManyRequests)
        if (toomany) {
          const message = this.translate("Too many requests from you!")
          this.showSnackBar(message, 3000)
          sending = false
          return dto
        } */
        res.synced = true
        sending = false
        return res;
      })
      .catch((error) => {
        sending = false
        let message = error?.error?.message;
        console.log('Error on server =' + message);
        throw error;

      });
  }

  async updateOrSaveMessages(dtoS: MessageDTO[], sending: boolean): Promise<MessageDTO[]> {
    console.log('ЗАпрос на сервер updateOrSaveMessage')
    for (let dto of dtoS) {
      dto.synced = false
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let creds = this.loadCredentials();
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ');
      return Promise.reject('No credentials');
    }
    console.log('ЗАпрос на сервер email ' + creds.email + ' token= ' + creds.token);

    let body = dtoS ? dtoS : {};
    let text = JSON.stringify(body);
    console.log('Запрос на сервер = ' + text);

    return this.http.post<MessageDTO[]>(
      this.serverurl + this.getcandidates + this.saveMessages,
      body,
      {
        headers: headers,
        params: {
          /* token: creds.token, */
          email: creds.email,
        },withCredentials: true
      }
    ).toPromise()
      .then((resDtoS: MessageDTO[]) => {
        sending = false

        let text = JSON.stringify(resDtoS);
        console.log('Ответ сервера  ' + text);
        for (let dto of resDtoS) {
          const loginOk= this.isLoginResultOk(dto.loginResult)
          if(!loginOk)
          return dtoS
          else
          dto.synced = true

          /* if(!loginOk) return */

      /*     const toomany = this.loginResultsEqual(dto.loginResult, LoginResult.TooManyRequests)
          if (toomany) {
            const message = this.translate("Too many requests from you!")
            this.showSnackBar(message, 3000)
            sending = false
            return dtoS
          }
          else
            dto.synced = true */

        }
        sending = false
        return resDtoS;
      })
      .catch((error) => {
        sending = false
        let message = error?.error?.message;
        console.log('Error on server =' + message);
        this.showSnackBar('Error on server: ' + message, 3000)

        throw error;

      });
  }

  /*  delayedMessageSender: any = undefined
   private messageCache: Map<number, MessageDTO> = new Map();
 
   putToMessageCache(message: MessageDTO) {
     this.messageCache.set(message.sentDate, message)
   }
   deleteFromMessageCache(message: MessageDTO) {
     this.messageCache.delete(message.sentDate)
   }
 
   sendDelayedMessage(message: MessageDTO, sending:boolean){
     if(this.delayedMessageSender)
     clearTimeout(this.delayedMessageSender)
   this.delayedMessageSender=setTimeout(async () =>
       {
         const dtoS = Array.from(this.messageCache.values())
         this.updateOrSaveMessages(dtoS,sending)
       },
       5000
 
   )
   } */



 /*  async updateToken() {
    console.log('ЗАпрос на сервер updateToken')
     const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let creds = this.loadCredentials()
    if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return
    }
    console.log('ЗАпрос на сервер ' + creds.email)
    console.log('ЗАпрос на сервер ' + creds.token)

    let mymail = creds.email
    let mytoken = creds.token
    let params = new HttpParams();
    params = params.append('token', mytoken);
    params = params.append('email', mymail);
    this.http.post(this.serverurl + this.updateprofileUrl + this.updatetokenURL, {}, {
      headers: headers,
      params: params

    })
      .subscribe(async (res: CredentialsResponse) => {
        let text = JSON.stringify(res)
        console.log('Ответ сервера  ' + text)
        let permanent = new Date().valueOf()
        let email = res.email
        let token = res.token
        let result = res.result
        const newcreds = new Credentials(email, token, permanent,0)
        const problem = token === "error"
        if (problem)
          this.clearCredentials()
        else
          this.saveCredentials(newcreds)
      },
        (error) => {
          let message = error?.error?.message
          console.log('Error on server =' + message)
        }
      )
  } */


  getlocale() {
    if (this.locale === 'ru')
      return Locale.Ru
    if (this.locale === 'en')
      return Locale.En
    else
      return Locale.En

  }
  antispamIsActive() {
    let now = new Date().valueOf()
    let previousdatestring = localStorage.getItem(constants.antispamtimeout)


    if (!previousdatestring) {
      console.log('antispamIsActive previousdatestring empty')
      this.saveLastAttemptTime()
      return false
    }

    let previousattempt = Number(previousdatestring)
    let timepassed = now - previousattempt
    if (timepassed > 30000) {
      console.log('antispamIsActive timepassed > 30000')

      this.saveLastAttemptTime()
      return false
    }
    /* let message = this.translate("Antispam") */
    this.showSnackBar("Antispam", 6000)

    return true

  }

  saveLastAttemptTime() {
    let now = new Date().valueOf()
    localStorage.setItem(constants.antispamtimeout, now.toString())
  }

  showSnackBar(message: string, duration: number | null) {
    this.snackbarQueue.push({ message, duration });
    if (!this.currentSnackbar) {
      this.processQueue();
    }
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
  isemailcorrect(email: string) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  saveCredentials(credentials: Credentials): void {
    try {
      // Сериализуем объект Credentials в строку JSON и сохраняем в localStorage
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      console.log('Credentials saved successfully.' + JSON.stringify(credentials));
      this.credentials.next(credentials)
      this.navigateto("profile")
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  }

  // Функция для загрузки Credentials из localStorage
  loadCredentials(): Credentials | null {
    try {
        // Загружаем данные из localStorage
        const credentialsData = localStorage.getItem('userCredentials');
        if (credentialsData) {
            // Десериализуем строку JSON обратно в объект Credentials
            const credentials = JSON.parse(credentialsData) as {
                email: string;
                token: string;
                permanent: number;
                cookieDate: number
            };
            const creds = new Credentials(credentials.email, credentials.token, credentials.permanent, credentials.cookieDate
            )
            this.credentials.next(creds)

            return creds
        }
        this.credentials.next(undefined)
        

        return null;
    } catch (error) {
        this.credentials.next(undefined)
        
        console.error('Error loading credentials:', error);
        return null;
    }
}

  isPermanent() {
    let credentials = this.loadCredentials()
    if (!credentials) return false
    if (credentials?.permanent === 0) return false
    return true
  }


  clearCredentials() {
    console.log("clearCredentials")

    localStorage.removeItem('userCredentials')
    this.credentials.next(undefined)
    const message = this.translate("loggedout")
    this.showSnackBar(message, 5000)
    this.navigateto("")
    console.log("clearCredentials конец")
  }
  

  ifNoCredsNavigateToLogin() {
    let credentials = this.loadCredentials()
    if (!credentials) {
      let text = 'сохранены ли логин и пароль ' + credentials || "null"
      console.log(text)
      this.navigateto("")
    }

  }


  updateUserProfile(user: MyUser) {
    this.userProfile.next(user);
  }


  checkUser(user: MyUser, stage: string) {
    let message = "checkUser на этапе " + stage
    if (!user) console.log(message + ' пустой!')
    let text = JSON.stringify(user)
    console.log(message + " " + text)

  }
  navigateto(link: string) {
    let text = 'navigateto = ' + link
    console.log(text)
    /*  this.router.navigate([link]); */
    this.router.navigate([link]).catch(err => {
      console.error('Navigation failed:', err);
    });
  }

  async getMySelf() {

    let me = this.userProfile.getValue()
    if (!me)
      await this.updateMyProfileOnServer(undefined)
    me = this.userProfile.getValue()
    return me

  }

  messageIsMine(message: MessageDTO) {
    let me = this.userProfile.getValue()
    if (!me) return false
    if (message.senderGlobalId === me.globalid) return true
    return false
  }

  getLocation(): Promise<Location> {

    /* const cors = require('cors');
    const corsOptions = {
      origin: 'https://5movies5books.com', // Replace with your actual origin
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }; */

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"

    },

    );

    return this.http.get<Location>('https://ipapi.co/json/', { headers: headers })
      .toPromise()
      .then((data: Location) => {
        // Можно добавить дополнительное преобразование, если структура отличается
        console.log('Location = :', data.region);
        return data;
      })
      .catch((error) => {
        console.error('Userdata Error getting region:', error);
        // Можно выбросить ошибку или вернуть null/undefined, если нужно
        throw error;
      });
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

  fixLocale(user: MyUser) {
    const loc = this.localeBS.value
    const updated = this.updateUsersLocale(user, loc)
    return updated

  }

  updateUsersLocale(user: MyUser, locale: Locale) {
    user.locale = locale
    console.log("updateUsersLocale  = " + locale.toString())
    return user
  }


  translate(word: string) {
    return this.translateService.instant(word)
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength) + '…';
    }
  }


  sortPhotos(list: Photo[]) {
    return list.sort((a, b) => this.getPhotoIndex(a) - this.getPhotoIndex(b));
  }

  getPhotoIndex(photo: Photo) {
    if (photo.index || photo.index === 0)
      return photo.index
    else return 9999999999
  }

  getUnfilledFields(user: MyUser): string | undefined {
    const unfilledFields: string[] = [];

    if (user.birthdate === undefined || user.birthdate === null) {
      unfilledFields.push(this.translate('BIRTHDATE'));
    }

    if (!user.locations || user.locations.length === 0) {
      unfilledFields.push(this.translate('LOCATIONS'));
    }

    if (user.gender === undefined || user.gender === null) {
      unfilledFields.push(this.translate('GENDER'));
    }

    if (!user.films || user.films.length === 0) {
      unfilledFields.push(this.translate('FILMS'));
    }

    if (!user.books || user.books.length === 0) {
      unfilledFields.push(this.translate('BOOKS'));
    }

    if (!user.photos || user.photos.length === 0) {
      unfilledFields.push(this.translate('PHOTOS'));
    }

    if (unfilledFields.length === 0) {
      /*  console.log(this.translate('ALL_FIELDS_FILLED')); */
      return undefined;
    } else {
      return unfilledFields.join(", ");
    }
  }

  calculateProfileCompletion(user: MyUser) {
    let filledCount = 0;
    const totalFields = 6; // количество существенных полей

    if (user.birthdate !== undefined && user.birthdate !== null) {
      filledCount++;
    }

    if (user.locations && user.locations.length > 0) {
      filledCount++;
    }

    if (user.gender !== undefined && user.gender !== null) {
      filledCount++;
    }

    if (user.films && user.films.length > 0) {
      filledCount++;
    }

    if (user.books && user.books.length > 0) {
      filledCount++;
    }

    if (user.photos && user.photos.length > 0) {
      filledCount++;
    }

    const completionPercentage = Math.round((filledCount / totalFields) * 100);
    return completionPercentage
    /*  return `Профиль заполнен на ${completionPercentage}%.`; */
  }
  loginResultsEqual(
    result1: LoginResult | number,
    result2: LoginResult | number
  ): boolean {
    console.log('result1 =' + result1)
    console.log('result2 =' + result2)
    // Приводим оба значения к типу LoginResult
    const normalizedResult1 = typeof result1 === 'number' ? result1 : LoginResult[result1];
    const normalizedResult2 = typeof result2 === 'number' ? result2 : LoginResult[result2];
    console.log('normalizedResult1 =' + normalizedResult1)
    console.log('normalizedResult2 =' + normalizedResult2)

    // Сравниваем числовые значения
    return normalizedResult1 === normalizedResult2;
  }




  exchangeCredsForCookies() {
     const creds = this.loadCredentials()
    if (!creds) {
        console.log('Отсутствуют кредс невозможно загрузить куки');
        return
    }
  /*   let whileago = new Date().valueOf()-TimeUnits.Minutes*1

     if (creds.cookieDate) {
        if(creds.cookieDate>whileago)
         console.log('Куки уже установлены');
         return
     } */
     const cookies = this.getCookie().then(res => {
        if (res === CokieStatus.Ok)
            this.updateCredswithCookieSet()
    }

    )

}
updateCredswithCookieSet() {
  let creds = this.loadCredentials()
  if (!creds) return
  /* creds.token = "" */
  let now = new Date().valueOf()
  creds.cookieDate = now
  this.saveCredentials(creds)
  localStorage.removeItem('email' )
  localStorage.removeItem('token' )
  
}

async getCookie(): Promise<CokieStatus> {

  let link =  `${this.serverurl}${this.updateprofileUrl}/getcookie`



  console.log('Запрос на сервер getCookie');
  const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  let parameters = this.getParamsForCookies();
  if (!parameters) {
      console.log('syncUser Credentials are null. Cannot sync');
      return CokieStatus.Failure;
  }

  return new Promise<CokieStatus>((resolve) => {
      this.http.post(
          link,
          {},
          {
              headers: headers,
              params: parameters,
              withCredentials: true
          }
      ).subscribe(
          (res: { status: string }) => {
              console.log('Ответ сервера: ' + res.status);
              if (res.status === 'Ok') {
                  this.showSnackBar('Постоянный токен успешно установлен в куки', 3000);
                  console.log('Постоянный токен успешно установлен в куки');
                  resolve(CokieStatus.Ok);
              } else {
                  this.showSnackBar('Ошибка при обновлении токена', 3000);
                  console.log('Ошибка при обновлении токена');
                  resolve(CokieStatus.Failure);
              }
          },
          (error) => {
              let message = error?.error?.message;
              console.log('Ошибка на сервере: ' + message);
              resolve(CokieStatus.Failure);
          }
      );
  });
}



async checkCookie(): Promise<CokieStatus> {
  let link =  `${this.serverurl}${this.updateprofileUrl}/checkcookie`

  /* this.checkdomain(); */
  console.log('Запрос на сервер для проверки куки');

  const email = this.loadCredentials()?.email;
  if (!email) {
      console.log('Email не найден. Невозможно проверить куки.');
      return CokieStatus.Failure;
  }

  return new Promise<CokieStatus>((resolve) => {
      this.http.post(
        link,
          {},
          {
              headers: new HttpHeaders({
                  'Content-Type': 'application/json'
              }),
              params: { email: email },
              withCredentials: true
          }
      ).subscribe(
          (res: any) => {
              console.log('Ответ сервера: ' + JSON.stringify(res));
              if (res.status === 'Cookie ok') {
                  this.showSnackBar('Куки действительны.', 3000);
                  console.log('Куки действительны.');
                  resolve(CokieStatus.Ok);
              } else {
                  this.showSnackBar('Куки недействительны или отсутствуют.', 3000);
                  console.log('Куки недействительны или отсутствуют.');
                  resolve(CokieStatus.Failure);
              }
          },
          (error) => {
              console.log('Ответ сервера по ошибке: ' + JSON.stringify(error));
              const message = error.error?.status;
              console.log('Ошибка на сервере: ' + message);
              resolve(this.handleError(message));
          }
      );
  });
}

getParamsForCookies() {
  let creds = this.loadCredentials()
  if (!creds) {
      console.log('syncUser Credentials are null. Cannot sync ')
      return undefined
  }
  if (!creds?.token) {
      console.log('token is null. Cannot get Cookies ')
      return undefined
  }
  if (creds.cookieDate) {
      console.log('cookie already set. ')
      return undefined
  }

  let mymail = creds.email
  let mytoken = creds.token
  let params = new HttpParams();
  params = params.append('token', mytoken);
  params = params.append('email', mymail);
  return params
}

handleError(error: string): CokieStatus {
  const cookieerror = "Cookie failure";
  if (error === cookieerror) {
      this.showSnackBar("Ошибка авторизации, вы будете разлогинены", 5000);
      return CokieStatus.Failure;
  }
  return CokieStatus.Failure; // или другое значение по умолчанию
}

checkdomain() {
  const x = document.domain
  console.log('domain = ' + x);
}


async logoutcookies() {

  let link =  `${this.serverurl}${this.updateprofileUrl}/deletecookies`

  console.log('Запрос на сервер для разлогинивания');

  // Получаем email из текущих данных (например, из localStorage или сервиса)
  const email = this.loadCredentials()?.email;
  if (!email) {
      console.log('Email не найден. Невозможно выполнить разлогинивание.');
      return;
  }

  // Отправляем запрос на сервер
  this.http.post(
      link, // URL вашего эндпоинта для разлогинивания
      {},
      {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          }),
          params: { email: email },
          withCredentials: true // Важно для передачи куки
      }
  ).subscribe(
      (res: MyUserDTO) => {
          console.log('Ответ сервера: ' + JSON.stringify(res));
          console.log('LoginResult= ' + res.loginResult + " LoginResult.LoggedOut = " + LoginResult.LoggedOut);
          const loggedout = this.loginResultsAreEqual(res.loginResult, LoginResult.LoggedOut)
          console.log('loggedout= ' + loggedout);


          if (loggedout) {
              this.showSnackBar("Succesfully logged out", 3000)

          }

          this.deleteCookie('permanentToken');

      },
      (error) => {
          let message = error?.error?.message;
          console.log('Ошибка на сервере: ' + message);
          /* this.clearCredentials();  */// Очищаем данные в случае ошибки
      }
  );
}

deleteCookie(name: string): void {
  console.log('Сбрасываю куки');

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}




convertLogresulttype(type: LoginResult | number | string): LoginResult {
  if (typeof type === 'string') {
      // Если пришла строка, например "LoggedOut", преобразуем её в соответствующее значение enum
      const key = type as keyof typeof LoginResult;
      if (LoginResult[key] !== undefined) {
          return LoginResult[key];
      } else {
          throw new Error(`Invalid LoginResult key: ${type}`);
      }
  } else if (typeof type === 'number') {
      // Если пришло число, проверяем, что оно соответствует значению enum
      if (Object.values(LoginResult).includes(type)) {
          return type as LoginResult;
      } else {
          throw new Error(`Invalid LoginResult value: ${type}`);
      }
  }
  return type;
}




loginResultsAreEqual(type1: LoginResult, type2: LoginResult) {
  return this.convertLogresulttype(type1) === this.convertLogresulttype(type2)
}



}

