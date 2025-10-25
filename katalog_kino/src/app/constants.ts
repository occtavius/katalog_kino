import { animate, state, style, transition, trigger } from "@angular/animations";

export enum TimeUnits {
  Days = 24 * 60 * 60 * 1000,
  Hours = 60 * 60 * 1000,
  Minutes = 60 * 1000,
  Seconds = 1000
}


export const constants = {
  userdoesntexist: "User doesn't exist",
  gocheckyourmail: "Go check your mail",
  incorrectemai: "Email is incorrect",
  somethingwentwrong: "Something went wrong!",
  enteremail: 'Enter your email to login/register',
  uidForPTF: 'uidForPTF',
  stayPeriod: 'stayPeriod',
  urgencyPeriod: 'urgency',
  checkActivityPeriod: TimeUnits.Days,
  maxActions: 50,
  maxTasks: 50,
  subscriptionNotificationPeriod: TimeUnits.Hours * 3,
  lastShowSubscriptionNotify: 'lastShowSubscriptionNotify',
  schema: 'planskeeper://',
  currentuser: 'currentuser',
  usercache: 'usercache',
  commonlistCache: 'commonlistCache',
  taskCache: 'taskCache',
  antispamtimeout: 'antispamtimeout',
  os: 'os',
  region: 'region',
  ispwa: 'ispwa',
  screen: 'screen',
  referer: 'referer',
  lastinfoload: 'lastinfoload',
  telegrambot: 'https://t.me/planskeeper_bot?start=',
  informOfTelegram: 'informOfTelegram',
  timeoutListReorder: 3000,
  animation: trigger('listAnimation', [
    transition(':enter', [
      style({ height: 0, width: 0, opacity: 1 }),
      animate('300ms ease-in-out', style({ height: '*', width: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ height: '*', opacity: 1 }),
      animate('300ms ease-in-out', style({ height: 0, opacity: 1 }))
    ])
  ]),
  /* animationDelayed: trigger('animationDelayed', [
    transition(':enter', [
      style({ height: '0', width: '0', opacity: 1 }),
      animate('{{ timings }}', style({ height: '*', width: '*', opacity: 1 }))
    ], { params: { timings: '300ms 0ms ease-in-out' } }),
    transition(':leave', [
      style({ height: '*', opacity: 1 }),
      animate('{{ timings }}', style({ height: '0', width:'0', opacity: 1 }))
    ], { params: { timings: '300ms 0ms ease-in-out' } })
  ]), */
  animationDelayed: trigger('animationDelayed', [
    // Появление с поворотом по горизонтальной оси (как переворот карточки)
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'perspective(500px) rotateX(-90deg)', // Начальный поворот на -90° (невидимая сторона)
        transformOrigin: 'top', // Ось вращения — верхняя грань
      }),
      animate(
        '{{ timings }}',
        style({
          opacity: 1,
          transform: 'perspective(500px) rotateX(0deg)', // Возврат в исходное положение
        })
      ),
    ], { params: { timings: '300ms 0ms ease-in-out'  } }), // Плавное замедление в конце
  
    // Исчезновение с улётом влево за пределы экрана
    transition(':leave', [
      style({
        opacity: 1,
        transform: 'translateX(0)', // Начальное положение
      }),
      animate(
        '{{ timings }}',
        style({
          opacity: 0,
          transform: 'translateX(-100vw)', // Улет за левую границу экрана
        })
      ),
    ], { params: {timings: '300ms 0ms ease-in-out'  } }), // Ускорение в начале
  ]),
  fadeinanimation: trigger('fadeInOut', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('500ms ease-in-out', style({ opacity: 0 }))
    ])
  ]),
  slideanimation: trigger('slideanimation', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 1 }),
      animate('300ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0)', opacity: 1 }),
      animate('300ms ease-in-out', style({ transform: 'translateX(-100%)', opacity: 1 }))
    ])
  ]),

  slideInOutLeft:trigger('slideInOutLeft', [
    state('void', style({ transform: 'translateX(-100vw)' })), // Начальное состояние (за пределами слева)
    state('*', style({ transform: 'translateX(0)' })),      // Состояние по умолчанию (в пределах экрана)
    transition(':enter', [  // Появление (заезд слева)
      animate('500ms ease-out', style({ transform: 'translateX(0)' }))
    ]),
    transition(':leave', [  // Исчезновение (отъезд направо)
      animate('500ms ease-in', style({ transform: 'translateX(100vw)' }))
    ])
  ]),

  // Анимация 2: Появление справа → Исчезновение влево
  slideInOutRight:trigger('slideInOutRight', [
    state('void', style({ transform: 'translateX(100vw)' })), // Начальное состояние (за пределами справа)
    state('*', style({ transform: 'translateX(0)' })),      // Состояние по умолчанию
    transition(':enter', [  // Появление (заезд справа)
      animate('500ms ease-out', style({ transform: 'translateX(0)' }))
    ]),
    transition(':leave', [  // Исчезновение (отъезд влево)
      animate('500ms ease-in', style({ transform: 'translateX(-100vw)' }))
    ])
  ]),
  bounceScaleInOut: trigger('bounceScaleInOut', [
    // Начальное состояние (невидимое, масштаб 0)
    state('void', style({
      transform: 'scale(0)',
      opacity: 0
    })),

    // Состояние по умолчанию (видимое, масштаб 1)
    state('*', style({
      transform: 'scale(1)',
      opacity: 1
    })),

    // Анимация появления с bouncing-эффектом
    transition(':enter', [
      animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({
        transform: 'scale(1)',
        opacity: 1
      }))
    ]),

    // Анимация исчезновения (плавное уменьшение)
    transition(':leave', [
      animate('300ms ease-in', style({
        transform: 'scale(0)',
        opacity: 0
      }))
    ])
  ]),
  lastsync: "lastsync",
  responseMarker: 'UPLOAD_RESPONSE:'

}
