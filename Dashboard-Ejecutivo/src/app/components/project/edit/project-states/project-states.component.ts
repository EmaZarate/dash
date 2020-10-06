import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-states',
  templateUrl: './project-states.component.html',
  styleUrls: ['./project-states.component.css']
})
export class ProjectStatesComponent implements OnInit {

  @Output() emitChangesStates = new EventEmitter<any>();

  @Input() isEditing: boolean;
  @Input() selectedProject: any;


  public entregablesBenefits: any[];
  public avanceBenefits: string;
  public fechaFinBenefits: string;
  public fechaInicioBenefits: string;
  public observacionesBenefits: string;

  public entregablesBAU: any[];
  public avanceBAU: string;
  public fechaFinBAU: string;
  public fechaInicioBAU: string;
  public observacionesBAU: string;

  public entregablesPostGoLive: any[];
  public avancePostGoLive: string;
  public fechaFinPostGoLive: string;
  public fechaInicioPostGoLive: string;
  public observacionesPostGoLive: string;

  public entregablesExecution: any[];
  public avanceExecution: string;
  public fechaFinExecution: string;
  public fechaInicioExecution: string;
  public observacionesExecution: string;

  public entregablesInception: any[];
  public avanceInception: string;
  public fechaFinInception: string;
  public fechaInicioInception: string;
  public observacionesInception: string;

  public entregablesPlanning: any[];
  public avancePlanning: string;
  public fechaFinPlanning: string;
  public fechaInicioPlanning: string;
  public observacionesPlanning: string;

  public entregablesRPF: any[];
  public avanceRPF: string;
  public fechaFinRPF: string;
  public fechaInicioRPF: string;
  public observacionesRPF: string;
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
        this.setContentState(this.selectedProject.proyectoEtapas, this.selectedProject.proyectoEtapaDocumentos);
        this.setBarStateProject(this.selectedProject.proyectoEtapas);
      }
    }
  }

  ngAfterViewInit(){
    this.setWidthNgTab();
  }

  editedStates(project) {
    this.isEditing = false;

    project.proyectoEtapas.filter(x => x.nombreEtapa != "Stop" && x.nombreEtapa != "Backlog").forEach(element => {

      element.fechaInicio = moment(element.fechaInicio.trim(), "DD/MM/YYYY HH:mm").isValid() ? moment(element.fechaInicio, "DD/MM/YYYY HH:mm").format("YYYY/MM/DD HH:mm"): '';
      element.fechaFin = moment(element.fechaFin.trim(), "DD/MM/YYYY HH:mm").isValid() ? moment(element.fechaFin, "DD/MM/YYYY HH:mm").format("YYYY/MM/DD HH:mm") : '';
      element.porcentajeAvance = !isNaN(element.porcentajeAvance) && element.porcentajeAvance != '' ? element.porcentajeAvance : 0;       
    });


    this.selectedProject = project;
    this.saveChanges();
    this.setContentState(project.proyectoEtapas, project.proyectoEtapaDocumentos);

  }

  setWidthNgTab() {
    var tabs = $("a[id^='ngb-tab']");
    for (var i = 0; i < tabs.length; i++) {
      if ($(tabs[i].parentElement).text().trim() == "Areas afectadas") {
        $(tabs[i].parentElement).width(151);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Risks") {
        $(tabs[i].parentElement).width(73);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Issues") {
        $(tabs[i].parentElement).width(81);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Equipo") {
        $(tabs[i].parentElement).width(85);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Units") {
        $(tabs[i].parentElement).width(73);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Actividades") {
        $(tabs[i].parentElement).width(118);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Proveedores") {
        $(tabs[i].parentElement).width(124);
      }
      else if ($(tabs[i].parentElement).text().trim() == "Documentos") {
        $(tabs[i].parentElement).width(126);
      }
      else {

        $(tabs[i].parentElement).width(83);
      }
    }

  }

  editMode(){
    this.isEditing = true;
    // this.mapProjectToModel();
  }

  cancelChanges() {
    this.isEditing = false;
  }

  saveChanges() {    
    this.emitChangesStates.emit(this.selectedProject);
  }

 setContentState(proyectoEtapas, proyectoEtapaDocumentos) {


   for (var i = 0; i < proyectoEtapas.length; i++) {
     switch (proyectoEtapas[i].nombreEtapa.toLocaleLowerCase().trim()) {
       case "rfp/rfi":         
         this.fechaInicioRPF = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinRPF = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avanceRPF = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesRPF = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesRPF = proyectoEtapas[i].observaciones;
         break
       case "planning":
         this.fechaInicioPlanning = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinPlanning = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avancePlanning = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesPlanning = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesPlanning = proyectoEtapas[i].observaciones;
         break
       case "inception":
         this.fechaInicioInception = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinInception = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avanceInception = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesInception = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesInception = proyectoEtapas[i].observaciones;
         break
       case "execution":
         this.fechaInicioExecution = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinExecution = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avanceExecution = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesExecution = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesExecution = proyectoEtapas[i].observaciones;
         break
       case "post go live":
         this.fechaInicioPostGoLive = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinPostGoLive = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avancePostGoLive = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesPostGoLive = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesPostGoLive = proyectoEtapas[i].observaciones;
         break
       case "bau":
         this.fechaInicioBAU = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinBAU = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avanceBAU = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesBAU = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesBAU = proyectoEtapas[i].observaciones;
         break
       case "benefits management":
         this.fechaInicioBenefits = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM").format("MM/YYYY") : '';
         this.fechaFinBenefits = moment(proyectoEtapas[i].fechaFin, "YYYY/MM").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM").format("MM/YYYY") : '';
         this.avanceBenefits = proyectoEtapas[i].porcentajeAvance + " %";
         this.entregablesBenefits = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
         this.observacionesBenefits = proyectoEtapas[i].observaciones;
         break
     }
   }

  }

  setBarStateProject(proyectoEtapas) {

    let arrayOfState = proyectoEtapas.filter(x => x.fechaInicio != null && new Date(x.fechaInicio) <= new Date());
    
    $("[class^='breadcrumbs-']").each((index, elem) => {
      let currentState = arrayOfState.filter(x => x.nombreEtapa.toLocaleLowerCase().trim() == $(elem).children().children().text().trim().toLocaleLowerCase()).map(x => x);
      
      if (currentState.length == 0) {
        this.setDisableState(elem);
      }

    });
  }

  setDisableState(elem) {
    switch ($(elem).children().children().text().trim().toLocaleLowerCase()) {
      case "rfp/rfi":
        $(elem).removeClass("breadcrumbs-rfp");
        $(elem).addClass("breadcrumbs-rfpDisable");
        break
      case "planning":
        $(elem).removeClass("breadcrumbs-planning");
        $(elem).addClass("breadcrumbs-planningDisable");
        break
      case "inception":
        $(elem).removeClass("breadcrumbs-inception");
        $(elem).addClass("breadcrumbs-inceptionDisable");
        break
      case "execution":
        $(elem).removeClass("breadcrumbs-execution");
        $(elem).addClass("breadcrumbs-executionDisable");
        break
      case "post go live":
        $(elem).removeClass("breadcrumbs-postGoLive");
        $(elem).addClass("breadcrumbs-postGoLiveDisable");
        break
      case "bau":
        $(elem).removeClass("breadcrumbs-bau");
        $(elem).addClass("breadcrumbs-bauDisable");
        break
      case "benefits management":
        $(elem).removeClass("breadcrumbs-benefits");
        $(elem).addClass("breadcrumbs-benefitsDisable");
        break
    }
  }

}
