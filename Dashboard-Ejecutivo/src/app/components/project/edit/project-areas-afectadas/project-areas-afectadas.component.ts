import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-areas-afectadas',
  templateUrl: './project-areas-afectadas.component.html',
  styleUrls: ['./project-areas-afectadas.component.css']
})
export class ProjectAreasAfectadasComponent implements OnInit {

  @Input() selectedProject;
  @Input() isEditing;
  @Input() areas;

  @Output() emitChanges = new EventEmitter();

  
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
        // this.mapProjectToModel();
      }
    }
    console.log(changes);
  }


  editMode() {
    this.isEditing = true;
    //this.mapProjectToModel();
  }

  cancelChanges() {
    this.isEditing = false;
  }

  saveChanges() {
    // this.mapModelToProject();
    this.emitChanges.emit(this.selectedProject);
    this.isEditing = false;
  }

  isChecked(id){
    let index = (this.selectedProject.proyectoAreasAfetadas as Array<any>).findIndex(x => x.idArea == id);
    if(index == -1){
      return false;
    }
    return true;
  }

  changeSelection(e, id) {
    if(e.target.checked){
      let areaSelected = this.areas.find(x => x.idArea == id);
      if(areaSelected != undefined){
        let newArea = { idArea: id, nombre: areaSelected.nombre, idProyecto: this.selectedProject.idProyecto };
        this.selectedProject.proyectoAreasAfetadas.push(newArea);
      }
    }
    else{
      let index = this.selectedProject.proyectoAreasAfetadas.findIndex(x => x.idArea == id);
      if(index != -1){
        this.selectedProject.proyectoAreasAfetadas.splice(index, 1);
      }
    }
  }

}
