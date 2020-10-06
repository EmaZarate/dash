import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../services/common-data.service';

@Component({
  selector: 'app-inside-routing',
  templateUrl: './inside-routing.component.html',
  styleUrls: ['./inside-routing.component.css']
})
export class InsideRoutingComponent implements OnInit {
  

  constructor(public _commonDataService: CommonDataService) { }

  ngOnInit() {
    this._commonDataService.showLoader(true);
  }

  toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document['mozFullScreenElement'] &&
      !document.webkitFullscreenElement && !document['msFullscreenElement']) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element['ALLOW_KEYBOARD_INPUT']);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

}
