import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2'
import { Table } from 'primeng/table';

@Component({
  selector: 'app-project-activities',
  templateUrl: './project-activities.component.html',
  styleUrls: ['./project-activities.component.css']
})
export class ProjectActivitiesComponent implements OnInit {


  @Input() isEditing;
  @Input() activities;
  @Input() idProyecto;

  @Output() activityEmitter = new EventEmitter();

  isAddingData = false;
  isEditingData = false;
  activitiesDelayedColums
  public listActivitiesDelayed: any[];
  public totalActivitiesRecords = 0;
  temporalId = 0;
  userRol
  newData = {idActividad: 0, descripcion:"", tempId:0, responsable:"", estado: ""};


  descriptionFilter: string;
  responsableFilter: string;

  constructor(private _authService: AuthService) { }
  
  ngOnInit() {

    this.userRol = this._authService.getUserLogedRol();

    this.activitiesDelayedColums = [
      { field: 'descripcion', header: 'Descripción'},
      { field: 'responsable', header: 'Responsable'}
    ];
  }

  ngOnChanges(changes) {
    if (changes.isEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }
    if (changes.activities.currentValue) {
      
      this.activities = changes.activities.currentValue;
      this.listActivitiesDelayed = changes.activities.currentValue;
      this.totalActivitiesRecords = changes.activities.currentValue.length;
      
    }
  }

  editMode() {
    this.isEditing = true;
  }

  cancelChanges(){
    this.isEditing = false;
  }

  saveChanges(){
    this.activityEmitter.emit(this.activities);
    this.isEditing = false;

  }

  newRow() {
    this.isEditing = true;
    this.isAddingData = true;
  }

  cancelEdition(){
    this.isAddingData = false;
    this.isEditingData = false;
    this.isEditing = false;
    this.newData.idActividad = 0;
    this.newData.descripcion = "";
    this.newData.responsable = "";
    this.newData.estado = "";
    this.newData.tempId = 0;
  }

  editRow(id, tempId) {
    
    if(id != undefined){
      var index = this.activities.findIndex(x => x.idActividad == id);
      this.newData.idActividad = id;
    }
    else{
      var index = this.activities.findIndex(x => x.tempId == tempId);
      this.newData.tempId = tempId;
    }

    this.newData.descripcion = this.activities[index].descripcion;
    this.newData.responsable = this.activities[index].responsable;
    this.newData.estado = this.activities[index].estado;
    this.isEditingData = true;
    this.isEditing = true;
    
  }

  deleteRow(id, tempId){

    var _this = this;
    Swal({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: '¿Esta seguro que desea eliminar la actividad?',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then(function (result) {


      if (result.value) {

        if (id != 0 && id != undefined) {

          let index = _this.activities.findIndex(x => x.idActividad == id);
          _this.activities.splice(index, 1);
        }
        else {
          var index = _this.activities.findIndex(x => x.tempId == tempId);
          _this.activities.splice(index, 1);
        }

        _this.saveChanges();
      }

      });
  }

  addData(){
    if(this.newData.idActividad != 0){
      let index = this.activities.findIndex(x => x.idActividad == this.newData.idActividad);
      this.activities[index].descripcion = this.newData.descripcion;
      this.activities[index].responsable = this.newData.responsable;
      this.activities[index].estado = this.newData.estado;
    }
    else{
      if(this.newData.tempId != 0){
        let index = this.activities.findIndex(x => x.tempId == this.newData.tempId);
        this.activities[index].descripcion = this.newData.descripcion;
        this.activities[index].responsable = this.newData.responsable;
        this.activities[index].estado = this.newData.estado;
      }
      else{

        let obj = {descripcion: this.newData.descripcion, responsable: this.newData.responsable, estado: this.newData.estado, idProyecto: this.idProyecto, tempId: this.temporalId};
        this.temporalId++;
        this.activities.push(obj);
      }

    }

    this.newData.descripcion = "";
    this.newData.estado = "";
    this.newData.responsable = "";
    this.newData.idActividad = 0;
    this.newData.tempId = 0;

    this.isAddingData = false;
    this.isEditingData = false;

    this.saveChanges();
  }
}
