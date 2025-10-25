import { Component, Input, OnInit } from '@angular/core';
import { Film, Locale, MyUser } from '../../../Entities/entities';
import { Syncservice } from '../../services/syncservice.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(public syncservice: Syncservice) { }


  @Input() film: Film | undefined
  @Input() user: MyUser | undefined
  @Input() myself: MyUser | undefined


  expand: boolean = false

  ngOnInit() { }


 

 

  filmIsAdded() {
    let added = this.hasFilm(this.film.filmId)
    return added
  }

  hasFilm(filmId: number): boolean {
    let updatedme = this.user
    if(this.myself)
    updatedme=this.myself
    if (!updatedme?.films) {
      return false; // Если массив фильмов не существует, возвращаем false
    }

    // Проверяем, есть ли фильм с указанным filmId в массиве фильмов
    return updatedme.films.some(film => film.filmId === filmId);
  }

  getButtonText() {
    if (this.filmIsAdded())
      return "X"
    else
      return "+"
  }

  addOrRemoveFilm() {
console.log("Фильм добавлен")  }

  expandcollapse() {
    this.expand = !this.expand
  }

  getImage() {
    const bigimage = this.film?.posterUrl
    const smallimage = this.film?.posterUrlPreview
    if (this.expand) return bigimage
    return smallimage
  }

  getBookClass() {
    if (this.expand)
      return "book-expand"
    return "book"
  }

  getTextareaClass() {
    if (this.expand)
      return "booktextarea-vert"
    return "booktextarea"
  }
  getButtonClass() {
    if (this.filmIsAdded())
      return "bookdeletebtn"
    else return "bookaddbtn"
  }

  getFilmTitle() {
    const locale = this.syncservice.localeBS.getValue()
    const titleru = this.film?.nameRu
    const titleen = this.film?.nameEn
    const year = this.film?.year  
    if (locale === Locale.Ru) {
      if (!titleru)
        return undefined
      {
        if (year)

          return titleru + ", " + year
        else return titleru
      }
    }
    else {
      if (!titleen)
        return undefined
      {
        if (year)
          return titleen + ", " + year
        else return titleen
      }
    }
  }


  getLength() {
    const length = this.film?.filmLength
    if (length ) return length+" m"
    else return undefined

  }

  getDescription(){
    let descr = this.film?.description
    if(!descr) return undefined
    descr = this.syncservice.truncateString(descr,300)
    return descr
  }

  bookismine(){
    if(this.myself.globalid===this.user.globalid)
    return true
  return false
  }
  showButton(){
    if ( !this. myself)
    return true
    if (!this.filmIsAdded())
    return true
  return false
  }

 

}
