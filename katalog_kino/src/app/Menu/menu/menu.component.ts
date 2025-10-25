/* import { constants } from './../../Constants/constants'; */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';
import { Syncservice } from '../../services/syncservice.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { constants } from '../../constants';

const slideanimation =     constants.slideanimation

const fadeinanimation=  constants.fadeinanimation

const listAnimation = constants.animation

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [slideanimation, listAnimation, fadeinanimation]
})
export class MenuComponent implements OnInit {
  ngOnInit(): void {
    this.isThemeDark()
    this.updateUnreadCount() 

  }
  constructor(private route: ActivatedRoute, private syncservice: Syncservice, private router: Router) {
    this.isThemeDark()

  }

  @Input() loggedin: boolean
  @Input() useractive: boolean
  expand = false
  isDarkTheme: boolean;
  unreadCount=0



  navigateProfile() {
    this.syncservice.navigateto("profile")
    setTimeout(() => {
      this.expandcollapse()
    }, 250);
  }
  navigateCandidates() {
    this.syncservice.navigateto("candidates")
    setTimeout(() => {
      this.expandcollapse()
    }, 250);
  }
  navigateDialogues() {
    this.syncservice.navigateto("dialogues")
    setTimeout(() => {
      this.expandcollapse()
    }, 250);
  }

  expandcollapse() {
    this.expand = !this.expand
    this.updateUnreadCount()
  }

  isRouteActive(path: string): boolean {
    const exact = true
    const matchOptions: IsActiveMatchOptions = exact
      ? { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' }
      : { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' };

    return this.router.isActive(path, matchOptions);
  }

  getOptionTextClass(isActive: boolean) {
    return {
      'showoption-selected': isActive,
      'showoption': !isActive
    };
  }

  getButtonclass(active: boolean) {
    if (active)
      return "menu-button"
    return "menu-button-trans"
  }

  switchTheme() {
    this.isDarkTheme = this.isThemeDark();
    this.syncservice.toggleTheme()
  }

  isThemeDark() {
    /* this.isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark'; */
    return this.syncservice.isDarkTheme()
  }

  logout(){
    this.syncservice.logoutEverywhere()
    setTimeout(() => {
      this.expandcollapse()
    }, 250);
  }


  async updateUnreadCount() {
    const count = await this.syncservice. getUnreadCount();
    if (count !== null) {
      console.log('Количество непрочитанных сообщений:', count);
      this.unreadCount=count
      // Обновите UI или выполните другие действия
    } else {
      console.log('Не удалось получить количество непрочитанных сообщений');
    }
  }
  getUnreadString(){
    return "   ("+this.unreadCount.toString()+")"
  }


}
