import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Syncservice } from '../../services/syncservice.service';
import { Film, MyUser } from '../../../Entities/entities';
import { MovieComponent } from '../movie/movie.component';
import { constants } from '../../constants';
const animationDelayed = constants.animationDelayed 

@Component({
  selector: 'chooseAmovie',
  templateUrl: './chooseAmovie.component.html',
  styleUrls: ['./chooseAmovie.component.css'],
  animations:[animationDelayed]
})
export class ChooseAmovieComponent implements OnInit  ,  AfterViewInit, OnDestroy, OnChanges{

  @ViewChild('movieElement') targetElement: ElementRef;
  private observer: IntersectionObserver;
  elementVisible = false

  constructor(private syncservice: Syncservice) {}

  searchResult:Film[] | undefined
  
  @Input() user: MyUser




  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

  searchMovies(keyword: string) {
    this.syncservice.searchMovies(keyword).subscribe(
      (data) => {
        console.log('Search results:', data);
        this.searchResult=data?.films
        // Обработка результатов поиска
      },
      (error) => {
        console.error('Error searching movies:', error);
        // Обработка ошибки
      }
    );
  }

  ngOnInit() {
  }

   userMoviesEmpty(){
    if(!this.user) return true
    if(!this.user.films) return true
    if( this.user.films.length===0) return true
    return false
  }
  getAnimationTimings(index: number): string {
    const delay= index*150
    let  easing: string = 'ease-in-out'
    let timings = `300ms ${delay}ms ${easing}`
    /* console.log("timings = "+timings) */

    return timings
  }
  observeIntesection(){
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const visiblePercentage = Math.floor(entry.intersectionRatio * 100);
         /*  console.log(`Элемент movie виден на ${visiblePercentage}%`); */
          if (entry.isIntersecting && entry.intersectionRatio >= 0.99) {
            this.onElementVisible();
          }
           
  
        });
      },
      {
        root: null,
        threshold: 0.99 // Только 99% видимости

       /*  threshold: Array.from({ length: 101 }, (_, i) => i * 0.01) */ // Пороги от 0% до 100%
      }
    );
    this.observer.observe(this.targetElement.nativeElement);
  }
  onElementVisible() {
   /*  console.log('Элемент ChooseAmovie виден на 99% или больше!'); */
     this.elementVisible=true
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.observeIntesection()
    }, 4000);
    
  }
  ngOnDestroy() {
   
   /*  this.observer.disconnect(); */
    this.observer = undefined

  }
}
