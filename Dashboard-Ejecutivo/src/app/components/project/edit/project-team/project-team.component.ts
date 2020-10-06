import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { RolService } from '../../../../services/rol.service';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {

  @Input() data;
  @Input() isEditing;
  @Input() title;
  @Input() idProyecto;


  public listTeamProject: any[];
  public totalTeamProjectRecords = 0;
  _roleTeamFields: any[];

  public teamColums = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'rol', header: 'Rol' }
  ];

  @Output() dataChangesEmitter = new EventEmitter();
  newData = { id: 0, nombre: "", tempId: 0, idRol: null, rol: "" };

  isAddingData = false;
  isEditingData = false;
  temporalId = 1;
  userRol

  constructor(private _authService: AuthService, private _roleService:RolService) { }

  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol();

    this.getAllRole();

  }

  getAllRole() {
       
      
    this._roleService.getAll().subscribe((res) => {
        
        this._roleTeamFields = res;
      });

  }

  ngOnChanges(changes) {

    if (changes.isEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }

    if (changes.data) {
      this.data = changes.data.currentValue;
      if (this.data) {
        this.listTeamProject = this.data;
        this.totalTeamProjectRecords = this.data.length;
      }
    }

    if (changes.title) {
      this.title = changes.title.currentValue;
    }

    if (changes.idProyecto) {
      this.idProyecto = changes.idProyecto.currentValue;
    }

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
    this.newData.nombre = "";
    this.newData.rol = "";
    this.newData.idRol = null;
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

    this.newData.nombre = this.data[index].nombre;
    this.newData.idRol = this.data[index].idRol;
    this.newData.rol = this.data[index].rol;
    this.isEditingData = true;
    
  }

  deleteRow(id, tempId){
    if(id != 0 && id != undefined){

      let index = this.data.findIndex(x => x.id == id);
      this.data.splice(index, 1);
    }
    else{
      var index = this.data.findIndex(x => x.tempId == tempId);
      this.data.splice(index, 1);
    }
  }

  addData() {
    debugger
    if(this.newData.id != 0){
      let index = this.data.findIndex(x => x.id == this.newData.id);
      this.data[index].nombre = this.newData.nombre;
      this.data[index].idRol = this.newData.idRol == "" ? null : this.newData.idRol;
      this.data[index].rol = this.findTeamRolById(this.newData.idRol) == null ? "" : this.findTeamRolById(this.newData.idRol).descripcion
    }
    else{
      if(this.newData.tempId != 0){
        let index = this.data.findIndex(x => x.tempId == this.newData.tempId);
        this.data[index].nombre = this.newData.nombre;
        this.data[index].idRol = this.newData.idRol == "" ? null : this.newData.idRol;
        this.data[index].rol = this.findTeamRolById(this.newData.idRol) == null ? "" : this.findTeamRolById(this.newData.idRol).descripcion
      }
      else{

        let obj = { nombre: this.newData.nombre, idRol: this.newData.idRol == "" ? null : this.newData.idRol, rol: this.findTeamRolById(this.newData.idRol) == null ? "" : this.findTeamRolById(this.newData.idRol).descripcion,idProyecto:this.idProyecto, tempId: this.temporalId};
        this.temporalId++;
        this.data.push(obj);
      }

    }

    this.newData.nombre = "";
    this.newData.rol = "";
    this.newData.idRol = null;
    this.newData.id = 0;
    this.newData.tempId = 0;

    this.isAddingData = false;
    this.isEditingData = false;
  }

  findTeamRolById(idRol) {
    return this._roleTeamFields.find(x => x.idRol == idRol) || null;
  }

}
