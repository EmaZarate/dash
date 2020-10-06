import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-proveedores',
  templateUrl: './project-proveedores.component.html',
  styleUrls: ['./project-proveedores.component.css']
})
export class ProjectProveedoresComponent implements OnInit {

  @Input() selectedProject;
  @Input() isEditing;
  @Input() proveedores;

  @Output() emitChanges = new EventEmitter();

  test = true;

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
    let index = (this.selectedProject.proyectoProveedor as Array<any>).findIndex(x => x.idProveedor == id);
    if(index == -1){
      return false;
    }
    return true;
  }

  changeSelection(e, id) {
    if(e.target.checked){
      let provSelected = this.proveedores.find(x => x.idProveedor == id);
      if(provSelected != undefined){
        let newProv = { idProveedor: id, nombre: provSelected.nombre, idProyecto: this.selectedProject.idProyecto };
        this.selectedProject.proyectoProveedor.push(newProv);
      }
    }
    else{
      let index = this.selectedProject.proyectoProveedor.findIndex(x => x.idProveedor == id);
      if(index != -1){
        this.selectedProject.proyectoProveedor.splice(index, 1);
      }
    }
  }

}
