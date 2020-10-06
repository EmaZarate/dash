import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as is from 'is_js';


@Component({
  selector: 'app-edit-tabs',
  templateUrl: './edit-tabs.component.html',
  styleUrls: ['./edit-tabs.component.css']
})

export class EditTabsComponent implements OnInit {


  @Input() selectedProject: any;

  @Output() emitChanges = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();

  public entregablesBenefits: any[];
  public avanceBenefits: string;
  public fechaFinBenefits: string;
  public fechaInicioBenefits: string;
  public observacionesBenefits: string;
  public checkBenefits: boolean;

  public entregablesBAU: any[];
  public avanceBAU: string;
  public fechaFinBAU: string;
  public fechaInicioBAU: string;
  public observacionesBAU: string;
  public checkBAU: boolean;

  public entregablesPostGoLive: any[];
  public avancePostGoLive: string;
  public fechaFinPostGoLive: string;
  public fechaInicioPostGoLive: string;
  public observacionesPostGoLive: string;
  public checkPostGoLive: boolean;

  public entregablesExecution: any[];
  public avanceExecution: string;
  public fechaFinExecution: string;
  public fechaInicioExecution: string;
  public observacionesExecution: string;
  public checkExecution: boolean;

  public entregablesInception: any[];
  public avanceInception: string;
  public fechaFinInception: string;
  public fechaInicioInception: string;
  public observacionesInception: string;
  public checkInception: boolean;

  public entregablesPlanning: any[];
  public avancePlanning: string;
  public fechaFinPlanning: string;
  public fechaInicioPlanning: string;
  public observacionesPlanning: string;
  public checkPlanning: boolean;

  public entregablesRPF: any[];
  public avanceRPF: string;
  public fechaFinRPF: string;
  public fechaInicioRPF: string;
  public observacionesRPF: string;
  public checkRFPRFI: boolean;


  fechaInicioValidRPF: boolean = false;
  fechaFinValidRPF: boolean = false;
  fechaInicioValidInception: boolean = false;
  fechaFinValidInception: boolean = false;
  fechaInicioValidPlanning: boolean = false;
  fechaFinValidPlanning: boolean = false;
  fechaInicioValidExecution: boolean = false;
  fechaFinValidExecution: boolean = false;
  fechaInicioValidPostGoLive: boolean = false;
  fechaFinValidPostGoLive: boolean = false;
  fechaInicioValidBAU: boolean = false;
  fechaFinValidBAU: boolean = false;
  fechaInicioValidBenefits: boolean = false;
  fechaFinValidBenefits: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes) {
    if (changes.selectedProject) {
      this.selectedProject = changes.selectedProject.currentValue;
      if (this.selectedProject) {
        this.setContentState(this.selectedProject.proyectoEtapas, this.selectedProject.proyectoEtapaDocumentos);
        // this.setProjectRol();
        // this.mapProjectToModel();
      }
    }
  }

  setContentState(proyectoEtapas, proyectoEtapaDocumentos) {
    for (var i = 0; i < proyectoEtapas.length; i++) {
      
      switch (proyectoEtapas[i].nombreEtapa.toLocaleLowerCase().trim()) {        
        case "rfp/rfi":
          this.fechaInicioRPF = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinRPF = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceRPF = proyectoEtapas[i].porcentajeAvance;
          this.entregablesRPF = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesRPF = proyectoEtapas[i].observaciones;
          this.checkRFPRFI = proyectoEtapas[i].vigente;
          break
        case "planning":
          this.fechaInicioPlanning = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinPlanning = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avancePlanning = proyectoEtapas[i].porcentajeAvance;
          this.entregablesPlanning = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesPlanning = proyectoEtapas[i].observaciones;
          this.checkPlanning = proyectoEtapas[i].vigente;
          break
        case "inception":
          this.fechaInicioInception = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinInception = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceInception = proyectoEtapas[i].porcentajeAvance;
          this.entregablesInception = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesInception = proyectoEtapas[i].observaciones;
          this.checkInception = proyectoEtapas[i].vigente;          
          break
        case "execution":
          this.fechaInicioExecution = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinExecution = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceExecution = proyectoEtapas[i].porcentajeAvance;
          this.entregablesExecution = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesExecution = proyectoEtapas[i].observaciones;
          this.checkExecution = proyectoEtapas[i].vigente;
          break
        case "post go live":
          this.fechaInicioPostGoLive = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinPostGoLive = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avancePostGoLive = proyectoEtapas[i].porcentajeAvance;
          this.entregablesPostGoLive = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesPostGoLive = proyectoEtapas[i].observaciones;
          this.checkPostGoLive = proyectoEtapas[i].vigente;
          break
        case "bau":
          this.fechaInicioBAU = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinBAU = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceBAU = proyectoEtapas[i].porcentajeAvance;
          this.entregablesBAU = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesBAU = proyectoEtapas[i].observaciones;
          this.checkBAU = proyectoEtapas[i].vigente;
          break
        case "benefits management":
          this.fechaInicioBenefits = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinBenefits = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceBenefits = proyectoEtapas[i].porcentajeAvance;
          this.entregablesBenefits = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa && x.obligatorio);
          this.observacionesBenefits = proyectoEtapas[i].observaciones;
          this.checkBenefits = proyectoEtapas[i].vigente;
          break
      }
    }

  }

  updateIsFaltaDocumento(arrayDocs) {
    if (arrayDocs) {
      arrayDocs.forEach(doc => {
        if (doc.urlDocumento == "") {
          doc.isFaltaDocumento = true;
        }
        else {
          doc.isFaltaDocumento = false;
        }
      });
    }

  };
  
  saveChanges() {

    this.updateIsFaltaDocumento(this.entregablesRPF);
    this.updateIsFaltaDocumento(this.entregablesBAU);
    this.updateIsFaltaDocumento(this.entregablesBenefits);
    this.updateIsFaltaDocumento(this.entregablesExecution);
    this.updateIsFaltaDocumento(this.entregablesInception);
    this.updateIsFaltaDocumento(this.entregablesPlanning);
    this.updateIsFaltaDocumento(this.entregablesPostGoLive);

    this.selectedProject.proyectoEtapaDocumentos =
      [
        ...this.entregablesBAU,
        ...this.entregablesExecution,
        ...this.entregablesInception,
        ...this.entregablesPlanning,
        ...this.entregablesPostGoLive,
        ...this.entregablesRPF
      ];

    this.updateProperties();
    this.emitChanges.emit(this.selectedProject);
  }

  createDate(date) {
    return new Date(date.year, (date.month - 1), date.day);
  }

  formatDateToMoment(date) {
    if (date.year) {
      let datetime = this.createDate(date);
      return moment(datetime, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");
    }
    return date;

  }

  clearDate(name) {

    switch (name) {
      
      case "fechaInicioRPF":
        this.fechaInicioRPF = "";
        this.fechaInicioValidRPF = false;
        break;
      case "fechaFinRPF":
        this.fechaFinRPF = "";
        this.fechaFinValidRPF = false;
        break;
      case "fechaInicioInception":
        this.fechaInicioInception = "";
        this.fechaInicioValidInception = false;
        break;
      case "fechaFinInception":
        this.fechaFinInception = "";
        this.fechaFinValidInception = false;
        break;
      case "fechaInicioPlanning":
        this.fechaInicioPlanning = "";
        this.fechaInicioValidPlanning = false;
        break;
      case "fechaFinPlanning":
        this.fechaFinPlanning = "";
        this.fechaFinValidPlanning = false;
        break;
      case "fechaInicioExecution":
        this.fechaInicioExecution = "";
        this.fechaInicioValidExecution = false;
        break;
      case "fechaFinExecution":
        this.fechaFinExecution = "";
        this.fechaFinValidExecution = false;
        break;
      case "fechaInicioPostGoLive":
        this.fechaInicioPostGoLive = "";
        this.fechaInicioValidPostGoLive = false;
        break;
      case "fechaFinPostGoLive":
        this.fechaFinPostGoLive = "";
        this.fechaFinValidPostGoLive = false;
        break;
      case "fechaInicioBAU":
        this.fechaInicioBAU = "";
        this.fechaInicioValidBAU = false;
        break;
      case "fechaFinBAU":
        this.fechaFinBAU = "";
        this.fechaFinValidBAU = false;
        break;
      case "fechaInicioBenefits":
        this.fechaInicioBenefits = "";
        this.fechaInicioValidBenefits = false;
        break;
      case "fechaFinBenefits":
        this.fechaFinBenefits = "";
        this.fechaFinValidBenefits = false;
        break;      
    }

    //this.fechaInicioRPF = "";
  }

  updateProperties() {
    for (var i = 0; i < this.selectedProject.proyectoEtapas.length; i++) {
      
      switch (this.selectedProject.proyectoEtapas[i].nombreEtapa.toLocaleLowerCase().trim()) {
        case "rfp/rfi":          
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioRPF);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinRPF);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avanceRPF;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesRPF;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkRFPRFI;
          break
        case "planning":
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioPlanning);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinPlanning);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avancePlanning;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesPlanning;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkPlanning;
          break
        case "inception":
          debugger
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioInception);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinInception);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avanceInception;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesInception;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkInception;
          break
        case "execution":
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioExecution);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinExecution);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avanceExecution;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesExecution;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkExecution;
          break
        case "post go live":
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioPostGoLive);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinPostGoLive);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avancePostGoLive;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesPostGoLive;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkPostGoLive;
          break
        case "bau":
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioBAU);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinBAU);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avanceBAU;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesBAU;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkBAU;
          break
        case "benefits management":
          this.selectedProject.proyectoEtapas[i].fechaInicio = this.formatDateToMoment(this.fechaInicioBenefits);
          this.selectedProject.proyectoEtapas[i].fechaFin = this.formatDateToMoment(this.fechaFinBenefits);
          this.selectedProject.proyectoEtapas[i].porcentajeAvance = this.avanceBenefits;
          this.selectedProject.proyectoEtapas[i].observaciones = this.observacionesBenefits;
          this.selectedProject.proyectoEtapas[i].vigente = this.checkBenefits;
          break
      }
    }

    setTimeout(() => {
      this.setBarStateProject(this.selectedProject.proyectoEtapas);
    }, 250);
 

  }

  invalidDate(isValid,inputName) {

    switch (inputName) {

      case "fechaInicioRPF":
        this.fechaInicioValidRPF = isValid;
        break;
      case "fechaFinRPF":
        this.fechaFinValidRPF = isValid;
        break;
      case "fechaInicioInception":
        this.fechaInicioValidInception = isValid;
        break;
      case "fechaFinInception":
        this.fechaFinValidInception = isValid;
        break;
      case "fechaInicioPlanning":
        this.fechaInicioValidPlanning = isValid;
        break;
      case "fechaFinPlanning":
        this.fechaFinValidPlanning = isValid;
        break;
      case "fechaInicioExecution":
        this.fechaInicioValidExecution = isValid;
        break;
      case "fechaFinExecution":
        this.fechaFinValidExecution = isValid;
        break;
      case "fechaInicioPostGoLive":
        this.fechaInicioValidPostGoLive = isValid;
        break;
      case "fechaFinPostGoLive":
        this.fechaFinValidPostGoLive = isValid;
        break;
      case "fechaInicioBAU":
        this.fechaInicioValidBAU = isValid;        
        break;
      case "fechaFinBAU":
        this.fechaFinValidBAU = isValid;        
        break;
      case "fechaInicioBenefits":
        this.fechaInicioValidBenefits = isValid;
        break;
      case "fechaFinBenefits":
        this.fechaFinValidBenefits = isValid;
        break;
    }

  }

  isValidDate(ngModel,fechaInputName) {

    debugger
    if (!is.object(ngModel)) {
      this.invalidDate((is.null(ngModel) ? false : is.dateString(ngModel) ? false : true), fechaInputName); 
    }
    else
    {
      this.invalidDate(false,fechaInputName); 
    }
  }

  setBarStateProject(proyectoEtapas) {

    let arrayOfState = proyectoEtapas.filter(x => moment(x.fechaInicio, "YYYY/MM/DD").isSameOrBefore(moment()));

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

  cancelChanges() {

    this.cancelEdit.emit();
    setTimeout(() => {
      this.setBarStateProject(this.selectedProject.proyectoEtapas);
    }, 10);
  }
  
}
