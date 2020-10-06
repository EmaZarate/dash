import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-objetivos',
  templateUrl: './project-objetivos.component.html',
  styleUrls: ['./project-objetivos.component.css']
})
export class ProjectObjetivosComponent implements OnInit {

  @Output() emitChangesObjetivos = new EventEmitter<any>();

  @Input() isEditing: boolean;
  @Input() selectedProject: any;

  newObjetivo = {idObjetivo: 0, descripcion:"", tempId:0};

  isAddingObjetivo = false;
  isEditingObjetivo = false;
  userRol
  temporalId = 1;

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

  editMode(){
    this.isEditing = true;
    // this.mapProjectToModel();
  }

  cancelChanges(){
    this.isEditing = false;
  }

  saveChanges(){
    // this.mapModelToProject();
    this.emitChangesObjetivos.emit(this.selectedProject);
    this.isEditing = false;
  }

  newRow(){
    this.isAddingObjetivo = true;
  }

  cancelEdition(){
    this.isAddingObjetivo = false;
    this.isEditingObjetivo = false;
    this.newObjetivo.idObjetivo = 0;
    this.newObjetivo.descripcion = "";
    this.newObjetivo.tempId = 0;
  }

  editRow(idObjetivo, tempId){
    if(idObjetivo != undefined){
      var index = this.selectedProject.objetivos.findIndex(x => x.idObjetivo == idObjetivo);
      this.newObjetivo.idObjetivo = idObjetivo;
    }
    else{
      var index = this.selectedProject.objetivos.findIndex(x => x.tempId == tempId);
      this.newObjetivo.tempId = tempId;
    }

    this.newObjetivo.descripcion = this.selectedProject.objetivos[index].descripcion;
    this.isEditingObjetivo = true;
    
  }

  deleteRow(idObjetivo, tempId){
    if(idObjetivo != 0){
      //delete existing objetivo
      let index = this.selectedProject.objetivos.findIndex(x => x.idObjetivo == idObjetivo);
      this.selectedProject.objetivos.splice(index, 1);
    }
    else{
      var index = this.selectedProject.objetivos.findIndex(x => x.tempId == tempId);
      this.selectedProject.objetivos.splice(index, 1);
    }
  }

  addObjetivo(){
    if(this.newObjetivo.idObjetivo != 0){
      //Updating existing objetivo
      let index = this.selectedProject.objetivos.findIndex(x => x.idObjetivo == this.newObjetivo.idObjetivo);
      this.selectedProject.objetivos[index].descripcion = this.newObjetivo.descripcion;
    }
    else{
      if(this.newObjetivo.tempId != 0){
        //Updating objetivo in memory
        let index = this.selectedProject.objetivos.findIndex(x => x.tempId == this.newObjetivo.tempId);
        this.selectedProject.objetivos[index].descripcion = this.newObjetivo.descripcion;
      }
      else{
        //Adding new objetivo
        let obj = {descripcion: this.newObjetivo.descripcion, idProyecto: this.selectedProject.idProyecto, tempId: this.temporalId};
        this.temporalId++;
        this.selectedProject.objetivos.push(obj);
      }

    }

    this.newObjetivo.descripcion = "";
    this.newObjetivo.idObjetivo = 0;
    this.newObjetivo.tempId = 0;

    this.isAddingObjetivo = false;
    this.isEditingObjetivo = false;
  }

}
