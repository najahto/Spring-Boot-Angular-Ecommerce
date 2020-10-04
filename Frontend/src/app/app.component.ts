import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angapp';
  constructor() {
    this.loadScripts();
  }
  loadScripts() {
    // This array contains all the files/CDNs 
    const dynamicScripts = [
      'assets/js/jquery-2.1.4.min.js',
      'assets/js/crum-mega-menu.js',
      'assets/js/swiper.jquery.min.js',
      'assets/js/theme-plugins.js',
      'assets/js/main.js',
      'assets/js/form-actions.js',
      'assets/js/velocity.min.js',
      'assets/js/ScrollMagic.min.js',
      'assets/js/animation.velocity.min.js'
      //Load all your script files here'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}