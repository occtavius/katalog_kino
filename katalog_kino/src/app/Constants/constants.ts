/* import { animate, state, style, transition, trigger } from "@angular/animations";

export enum TimeUnits {
    Days = 24 * 60 * 60 * 1000,
    Hours = 60 * 60 * 1000,
    Minutes = 60 * 1000,
    Seconds = 1000
  }


export const constants = {
    userdoesntexist:"User doesn't exist",
    gocheckyourmail:"Go check your mail",
    incorrectemai:"Email is incorrect",
    somethingwentwrong:"Something went wrong!",
    enteremail:'Enter your email to login/register',
    uidForPTF:'uidForPTF',
    stayPeriod:'stayPeriod',
    urgencyPeriod:'urgency',
    checkActivityPeriod:TimeUnits.Days,
    maxActions:50,
    maxTasks:50,
    subscriptionNotificationPeriod:TimeUnits.Hours*3,
    lastShowSubscriptionNotify:'lastShowSubscriptionNotify',
    schema:'planskeeper://',
    currentuser:'currentuser',
    usercache:'usercache',
    commonlistCache:'commonlistCache',
    taskCache:'taskCache',
    antispamtimeout:'antispamtimeout',
    os:'os',
    region:'region',
    ispwa:'ispwa',
    screen:'screen',
    referer:'referer',
    lastinfoload:'lastinfoload',
    telegrambot:'https://t.me/planskeeper_bot?start=',
    informOfTelegram:'informOfTelegram',
    timeoutListReorder:1000,
    animation:trigger('listAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 1 }),
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-in-out', style({ height: 0, opacity: 1 }))
      ])
    ]),
    fadeinanimation:trigger('fadeInOut', [
      transition(':enter', [ // При появлении элемента
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // При исчезновении элемента
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    slideanimation:trigger('slideInOut', [
      transition(':enter', [ // При появлении элемента
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [ // При исчезновении элемента
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    lastsync:"lastsync",
    responseMarker : 'UPLOAD_RESPONSE:'

}
 */