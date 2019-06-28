import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'list-box'
    },
    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'exit'
    }

  ];



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
