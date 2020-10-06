import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonDataService } from '../../services/common-data.service';



declare var $:any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSlideMenu: boolean = false;

  constructor(private router: Router
    ,private _loginService: LoginService
    ,public _commonDataService: CommonDataService) { }
  userLoged = new User();

  ngOnInit() {


    this.toggleMenu();
    this._loginService.userLoged$
        .subscribe((val: User)=>{        
            if(val){
              this.userLoged = val;     
            }
          
        });





  }

  toggleMenu() {

    this.setWidthState(window.innerWidth);

    !this.isSlideMenu ? document.getElementById("wrapperMenuSlice").setAttribute("class", "wrapper slide-menu") : document.getElementById("wrapperMenuSlice").setAttribute("class", "wrapper");    
    this.isSlideMenu = !this.isSlideMenu;
  }


  logout() {

    this._commonDataService.showLoader(true);

    this._loginService.logout();

    setTimeout(() => {
      this._commonDataService.showLoader(false);
      this.router.navigate(['/login']);
    },10000)
  }

  setWidthState(innerWidth) {

    if (innerWidth <= 1920 && innerWidth >= 1838) {

      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          if ($(elem).hasClass("menuOpen1920Width")) {
            $(elem).removeClass("menuOpen1920Width");
          }
          $(elem).addClass("menuClose1920Width");
        });
      } else {
        $(".steps li").each((i, elem) => {
          if ($(elem).hasClass("menuClose1920Width")) {
            $(elem).removeClass("menuClose1920Width");
          }
          $(elem).addClass("menuOpen1920Width");
        });
      }
    }
    else if (innerWidth <= 1838 && innerWidth >= 1680) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "195px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else if (innerWidth <= 1680 && innerWidth >= 1579) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "180px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else if (innerWidth <= 1579 && innerWidth >= 1400) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "150px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else if (innerWidth <= 1400 && innerWidth >= 1170) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else if (innerWidth <= 1170 && innerWidth >= 1090) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "113px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else if (innerWidth <= 1090 && innerWidth >= 900) {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "100px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }
    else {
      if (!this.isSlideMenu) {

        $(".steps li").each((i, elem) => {
          elem.style.width = "90px"
        });

      } else {
        $(".steps li").each((i, elem) => {
          elem.style.width = "120px"
        });
      }
    }

  }
}
