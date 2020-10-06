import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  @Input() index: number;
  wrapDiv:string ="wrapDiv";
  submenu:string = "submenu";
  show: boolean = false;

  constructor() { }

  ngOnInit() {

    this.wrapDiv = this.wrapDiv + this.index;
    this.submenu = this.submenu + this.index;
  }

  OpenAccordion(sectionName, Wrapdiv) {

    var CurrentCls = document.getElementById(this.submenu + sectionName).getAttribute("class");
    if (CurrentCls == "acd-des") {
      document.getElementById(this.submenu + sectionName).setAttribute("class", "acd-des show");
      document.getElementById(this.wrapDiv + Wrapdiv).setAttribute("class", "acd-group acd-active");
    }
    else {
      document.getElementById(this.submenu + sectionName).setAttribute("class", "acd-des");
      document.getElementById(this.wrapDiv + Wrapdiv).setAttribute("class", "acd-group");
    }
  }

  mouseEnter(){
    this.show= true;
  }

  mouseLeave(){
    this.show = false;
  }

  expandCollpse(sectionName) {
    var CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "acd-des collapse" || CurrentCls == "acd-des collapse hide")
    {
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse show");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "true");
    }
    else {
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
    }
}

}
