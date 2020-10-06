import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-documentos',
  templateUrl: './project-documentos.component.html',
  styleUrls: ['./project-documentos.component.css']
})
export class ProjectDocumentosComponent implements OnInit {


  @Input() selectedProject;
  @Input() isEditing;

  @Output() emitChanges = new EventEmitter();
  
  documentsFiltered = [];
  documentsObligatories = [];
  stateFiltered = [];
  userRol

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol();
  }

  ngOnChanges(changes) {
    
    if (changes.debuggerisEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }
    if (changes.selectedProject) {
      this.selectedProject = changes.selectedProject.currentValue;
      if (this.selectedProject) {
        this.filterDocuments();        
        this.stateFiltered = this.selectedProject.proyectoEtapas.slice(0, 7);
      }
    }
  }

  filterDocuments(){
    this.documentsFiltered = [];
    this.documentsObligatories = [];
    this.selectedProject.proyectoEtapaDocumentos.forEach(doc => {
      
      if (!doc.obligatorio) {
        doc.urlDocumento = this.setHttpUrl(doc.urlDocumento);
        this.documentsFiltered.push(doc);
      }
      else {
        doc.urlDocumento = this.setHttpUrl(doc.urlDocumento);
        this.documentsObligatories.push(doc);
      }
    });
  }

  setHttpUrl(url) {
    if (!!url && !!url.trim()) {
      if (!/^(https?:)?\/\//i.test(url)) {
        url= 'http://' + url;
      }
    }
    return url;
  }

  getClasses(className) {
    return className.replace(/\/|\s/g, '');
  }

  OpenAccordion(sectionName, Wrapdiv) {
    var CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "acd-des") {
      document.getElementById(sectionName).setAttribute("class", "acd-des show");
      document.getElementById(Wrapdiv).setAttribute("class", "acd-group acd-active");
    }
    else {
      document.getElementById(sectionName).setAttribute("class", "acd-des");
      document.getElementById(Wrapdiv).setAttribute("class", "acd-group");
    }
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

    this.updateIsFaltaDocumento(this.documentsFiltered);
    this.selectedProject.proyectoEtapaDocumentos = [...this.documentsFiltered, ...this.documentsObligatories];
    this.filterDocuments();

    this.emitChanges.emit(this.selectedProject.proyectoEtapaDocumentos);
    this.isEditing = false;
  }

  updateIsFaltaDocumento(arrayDocs){
    arrayDocs.forEach(doc => {
      if (doc.urlDocumento == "") {
        doc.isFaltaDocumento = true;
      }
      else {
        doc.isFaltaDocumento = false;
      }
    });
  }
}
