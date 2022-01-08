import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {fader,slider} from './route-animations';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ // <-- add your animations here
   fader,
   slider,
    // transformer,
    //stepper,
  ]

})


export class AppComponent {
  public showContent: boolean = false;
  public ngOnInit() {
    setTimeout(()=>this.showContent=true, 2000);
  }
  title = 'MrRobot';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
}
