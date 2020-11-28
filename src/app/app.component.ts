import { LoginPageModule } from './pages/login/login.module';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home-outline'
    },
    {
      title: 'Login',
      url: 'login',
      icon: 'log-in-outline'
    },
    {
      title: 'Feed de Notícias',
      url: 'noticias',
      icon: 'newspaper-outline'
    },
    {
      title: 'Mapa',
      url: 'maps',
      icon: 'locate-outline'
    },
  ];

  constructor(
    public authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.platform = platform;
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout() {
    this.authService.logout();
  }

  exitApp(){
    navigator['app'].exitApp();
 }

}
