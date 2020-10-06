import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-risks',
  templateUrl: './project-risks.component.html',
  styleUrls: ['./project-risks.component.css']
})
export class ProjectRisksComponent implements OnInit {

  @Input() data;
  @Input() isEditing;
  @Input() title;
  @Input() idProyecto;

  @Output() dataChangesEmitter = new EventEmitter();

  newData = {id: 0, descripcion:"", tempId:0};

  isAddingData = false;
  isEditingData = false;

  temporalId = 1;

  userRol

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol();
  }

  ngOnChanges(changes) {
    if (changes.isEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }
    if (changes.data) {
      this.data = changes.data.currentValue;
    }
    if (changes.title) {
      this.title = changes.title.currentValue;
    }
    if (changes.idProyecto) {
      this.idProyecto = changes.idProyecto.currentValue;
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
    this.dataChangesEmitter.emit(this.data);
    this.isEditing = false;
  }

  newRow(){
    this.isAddingData = true;
  }

  cancelEdition(){
    this.isAddingData = false;
    this.isEditingData = false;
    this.newData.id = 0;
    this.newData.descripcion = "";
    this.newData.tempId = 0;
  }

  editRow(id, tempId){
    if(id != undefined){
      var index = this.data.findIndex(x => x.id == id);
      this.newData.id = id;
    }
    else{
      var index = this.data.findIndex(x => x.tempId == tempId);
      this.newData.tempId = tempId;
    }

    this.newData.descripcion = this.data[index].descripcion;
    this.isEditingData = true;
    
  }

  deleteRow(id, tempId){
    if(id != 0){

      let index = this.data.findIndex(x => x.id == id);
      this.data.splice(index, 1);
    }
    else{
      var index = this.data.findIndex(x => x.tempId == tempId);
      this.data.splice(index, 1);
    }
  }

  addData(){
    if(this.newData.id != 0){
      let index = this.data.findIndex(x => x.id == this.newData.id);
      this.data[index].descripcion = this.newData.descripcion;
    }
    else{
      if(this.newData.tempId != 0){
        let index = this.data.findIndex(x => x.tempId == this.newData.tempId);
        this.data[index].descripcion = this.newData.descripcion;
      }
      else{

        let obj = {descripcion: this.newData.descripcion, idProyecto: this.idProyecto, tempId: this.temporalId};
        this.temporalId++;
        this.data.push(obj);
      }

    }

    this.newData.descripcion = "";
    this.newData.id = 0;
    this.newData.tempId = 0;

    this.isAddingData = false;
    this.isEditingData = false;
  }


}
