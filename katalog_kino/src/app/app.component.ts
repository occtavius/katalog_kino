import { TranslateService } from '@ngx-translate/core';
import { Syncservice } from './services/syncservice.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private onWindowCloseHandler: () => void;

  useractive = false
  private timeoutId: any;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    /*  console.log('Прокрутка окна:', event); */
    this.setScrollingOrTouching()
    // Ваш код для обработки события прокрутки
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    /*  console.log('Начало касания:', event); */
    this.setScrollingOrTouching()
    // Ваш код для обработки начала касания
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    /* console.log('Движение касания:', event); */
    this.setScrollingOrTouching()
    // Ваш код для обработки движения касания
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    /* console.log('Конец касания:', event); */
    this.setScrollingOrTouching()
    // Ваш код для обработки конца касания
  }

  ngOnInit(): void {
    this.subscribe()
  }


  constructor(private syncservice: Syncservice,
    private translateService: TranslateService,
    private router: Router,
  ) {
    console.log('constructor   для AppComponent   changes = ')
    this.uselocale()
  }

  uselocale() {

    let locale = this.syncservice.checklocale()
    this.translateService.use(locale);

  }

  setScrollingOrTouching() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // Устанавливаем значение true
    this.syncservice.scrollingOrTouching.next(true);

    // Сбрасываем значение на false через 3 секунды
    this.timeoutId = setTimeout(() => {
      this.syncservice.scrollingOrTouching.next(false);
    }, 3000); // 3000 миллисекунд = 3 секунды
  }


  subscribe() {



    this.syncservice.scrollingOrTouchingBS.subscribe(isscrolling => {

      this.useractive = isscrolling
      /*   console.log("useractive = "+this.useractive) */
    })

    this.setupDestroyListener()
  }


  setupDestroyListener() {
    this.onWindowCloseHandler = () => {
      console.log('Window is about to close or unload');
      this.endSession()
    };

    window.addEventListener('beforeunload', this.onWindowCloseHandler);
  }



  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    window.removeEventListener('beforeunload', this.onWindowCloseHandler);

  }

  async endSession() {
   /*  this.syncservice.finishSession(this.syncservice.session).then(session => this.syncservice.session = session) */
    this.syncservice.session=  await this.syncservice.finishSession( this.syncservice.session) 
  }

} 
