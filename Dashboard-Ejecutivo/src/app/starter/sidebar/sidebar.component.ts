import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  public scrollbarOptions = { axis: 'yx', theme: 'minimal' }
  public userRol: string

  constructor(
    public _commonDataService: CommonDataService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol()
  }


  expandCollpse(sectionName) {
    var CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "collapse" || CurrentCls == "collapse hide") {
      document.getElementById(sectionName).setAttribute("class", "collapse show");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "true");
    }
    else {
      document.getElementById(sectionName).setAttribute("class", "collapse hide");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
    }
  }
}
