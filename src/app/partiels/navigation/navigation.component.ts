import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  checkLogin: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log('------------');
    console.log(this.getCookie('user_id'));
    console.log('------------');

    if (this.getCookie('user_id') != null) {
      this.checkLogin = false;
    } else {
      this.checkLogin = true;
    }

  }
  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
  logout() {
    this.setCookie('token', '', -7);
    this.setCookie('user_id', '', -7);
    window.location.href = '/forside';
  }

  setCookie(cnamne, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString;
    document.cookie = `${cnamne} = ${cvalue}; ${expires};path=/`;
  }
}
