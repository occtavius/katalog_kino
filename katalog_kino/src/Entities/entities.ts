
export class MyUser {
  globalid: number
  localid: number
  telegramContact: TelegramContact
  films: Film[] = []
  books: Book[] = []
  sentMessages: Message[] = []
  receivedMessages: Message[] = []
  photos: Photo[] = []
  locations: Location[] = []
  gender: Gender
  preferences: Preferences
  firstName: string
  email: string
  locked: boolean
  enabled: boolean
  locale: Locale
  subscriptionActual: SubscriptionType
  subscriptions: Subscription[] = []
  periodkeepfinished: number
  lastsync: number
  os: string
  region: string
  ispwa: boolean
  screen: number
  referer: string
  telegram: string
  birthdate: number
}





export interface Film {
  filmId: number;
  nameRu: string;
  nameEn: string;
  type: string;
  year: string;
  description: string;
  filmLength: string;
  countries: Country[];
  genres: Genre[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
}


export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}


export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  imageLinks?: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  searchInfo: SearchInfo;
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export class RegistrationRequest {
  password: string | undefined
  email: string | undefined
  locale: Locale | undefined
  referer: string | undefined
  telegram: string | undefined
}
export enum Locale {
  Ru,
  En
}

export class ServiceMessage {
  text: string | undefined
  date: number | undefined
}





export class Preferences {
  id: number;
  preferredGender: Gender;
  bottomAge: number;
  topAge: number;
  notificationsHour: number;
  searchradius: number;
  user: MyUser;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NoMatter = 'NoMatter'
}

export class Subscription {
  id: number | null;
  customer: MyUser;
  subscriptionType: SubscriptionType | null;
  purchasedate: number | null;
  tilldate: number | null;
  message: string | null;
}

export enum SubscriptionType {
  None,
  Timely,
  Unlim
}


export class TelegramContact {
  id: number;
  chatId: string;
  username: string;
  languageCode: string;
  lastMessageTimestamp: Date;

}


export class Message {
  id: number
  sender: MyUser
  recipient: MyUser
  text: string
  sentDate: number
  readDate: number
  type: MessageType
  synced: boolean
}

export class MessageDTO {
  id: number;
  senderGlobalId: number;
  recipientGlobalId: number;
  text: string;
  sentDate: number;
  readDate: number;
  type: MessageType;
  synced: boolean;
  loginResult: LoginResult

}

export enum MessageType {
  See,
  Like,
  Message,

}


export class MessageResult {
  messages: MessageDTO[]
  currentPage: number
  totalPages: number
  totalElements: number
  loginResult: LoginResult

}

export class Photo {
  id: string
  url: string
  media: string
  thumb: string
  width: number
  height: number
  user: MyUser
  index: number
}

export class PhotoResponse {
  data?: Photo; // Данные о фото (опционально)
  error?: ErrorResponse; // Информация об ошибке (опционально)
  success: boolean;
  status: number;
}

export class ErrorResponse {
  message: string;
}


export enum LoginResult {
  Success,
  Failure,
  Cooldown,
  LoggedOut,
  TokenExpired,
  TooManyRequests
}

export class MyUserDTO {
  innerUserDTO: MyUser
  loginResult: LoginResult
}


export class Credentials {
  email: string
  token: string
  permanent: number
  cookieDate:number
  constructor(email: string, token: string, permanent: number, cookieDate:number
      ) {
    this.email = email
    this.token = token
    this.permanent = permanent
    this.cookieDate=cookieDate
  }
}

export class CredentialsResponse {
  email: string
  token: string
  result: LoginResult
}

export class Candidate {
  myUserInnerDTO: MyUser
  matchCount: number
  unreadMessages: number
  distance: number
  loginResult: LoginResult

}

export class CandidateResult {
  candidates: Candidate[];
  currentPage: number
  totalPages: number
  totalElements: number
  loginResult: LoginResult

}
export class Customer {
  innerUserDTO: MyUser
  sessionsDurationLastWeek: number
  sessionsDurationTotal: number
}

export class CustomerResult {
  customers: Customer[]
  currentPage: number
  totalPages: number
  totalElements: number
  loginResult: LoginResult

}

export class Location {
  id: number
  ip: string
  network: string
  version: string
  city: string
  region: string
  regionCode: string
  country: string
  countryName: string
  countryCode: string
  countryCodeIso3: string
  countryCapital: string
  countryTld: string
  continentCode: string
  inEu: boolean
  postal: string
  latitude: number
  longitude: number
  timezone: string
  utcOffset: string
  countryCallingCode: string
  currency: string
  currencyName: string
  languages: string
  countryArea: number
  countryPopulation: number
  asn: string
  org: string
  updated: number
  user: MyUser
}

export enum ShowOption {
  Interests,
  Messages,
  None,
  Photos
}

export class Session {
  id: number
  started: number
  ended: number
  userid: number
  visitedProfileId: number
  loginResult: LoginResult
}

export class Visit {
  visitor: MyUser
  session: Session
}

export class VisitResult {
  visits: Visit[]
  currentPage: number
  totalPages: number
  totalElements: number
  loginResult: LoginResult
}

export interface Point {
  x: number;
  y: number;
}

export interface ElementEdgeCenters {
  leftCenter: Point;   // Левая точка по центру (Y)
  topCenter: Point;    // Верхняя точка по центру (X)
  rightCenter: Point;  // Правая точка по центру (Y)
  bottomCenter: Point; // Нижняя точка по центру (X)
}
export enum ElementSide {
  Left  ,
  Right  ,
  Top  ,
  Bottom  ,
}
export interface ElementEdgePoint {
  side: ElementSide;
  point: Point;
}
export interface RoutePoint {
  x: number;
  y: number;
  isControlPoint: boolean; // Является ли точка контрольной (для Bezier)
}

export class DemoMatch{
   person1:Demoperson
   person2:Demoperson
   bookmatchcount:number
   filmmatchcount:number
   showperson1:boolean= false
   showperson2:boolean= false
   shownote:boolean= false

}

export class Demoperson{
  gendermale:boolean
  age:number
  name:string
  picIndex:number

}

export enum CokieStatus{
  Ok,
  Failure

}