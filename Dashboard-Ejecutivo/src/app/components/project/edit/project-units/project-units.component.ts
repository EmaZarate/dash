import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-units',
  templateUrl: './project-units.component.html',
  styleUrls: ['./project-units.component.css']
})
export class ProjectUnitsComponent implements OnInit {

  @Input() selectedProject;
  @Input() isEditing;

  @Output() emitChangesUnits = new EventEmitter();

  unidadArt;
  unidadSegArg;
  unidadSegUru;
  unidadRetiro;
  unidadCajaMutual;
  unidadServFinanciero;
  unidadTurismo;
  unidadAsoServ;

  userRol

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol();
  }

  ngOnChanges(changes) {
    if (changes.isEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }
    if (changes.selectedProject) {
      this.selectedProject = changes.selectedProject.currentValue;
      if (this.selectedProject) {
        // this.setProjectRol();
        this.mapProjectToModel();
      }
    }
    console.log(changes);
  }

  mapProjectToModel(){
    this.unidadArt = this.selectedProject.unidadArt;
    this.unidadSegArg = this.selectedProject.unidadSegArg;
    this.unidadSegUru = this.selectedProject.unidadSegUru;
    this.unidadRetiro = this.selectedProject.unidadRetiro;
    this.unidadCajaMutual = this.selectedProject.unidadCajaMutual;
    this.unidadServFinanciero = this.selectedProject.unidadServFinanciero;
    this.unidadTurismo = this.selectedProject.unidadTurismo
    this.unidadAsoServ = this.selectedProject.unidadAsoServ;
  }
  
  mapModelToProject(){
    this.selectedProject.unidadArt = this.unidadArt;
    this.selectedProject.unidadSegArg = this.unidadSegArg;
    this.selectedProject.unidadSegUru = this.unidadSegUru;
    this.selectedProject.unidadRetiro = this.unidadRetiro;
    this.selectedProject.unidadCajaMutual = this.unidadCajaMutual;
    this.selectedProject.unidadServFinanciero = this.unidadServFinanciero;
    this.selectedProject.unidadTurismo = this.unidadTurismo;
    this.selectedProject.unidadAsoServ = this.unidadAsoServ;
  }

  editMode() {
    this.isEditing = true;
    //this.mapProjectToModel();
  }

  cancelChanges() {
    this.isEditing = false;
  }

  saveChanges() {
    this.mapModelToProject();
    this.emitChangesUnits.emit(this.selectedProject);
    this.isEditing = false;
  }

}
