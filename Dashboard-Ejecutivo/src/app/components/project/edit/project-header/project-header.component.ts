import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css']
})
export class ProjectHeaderComponent implements OnInit {

  @Output() emitChangesHeader = new EventEmitter<any>();

  @Input() isEditing: boolean;
  @Input() selectedProject: any;

  //ngModels
  name;
  ultimaModificacion;
  publicacion;
  draft;
  npv;
  irr;
  health;
  payback;
  presupuestoPlanificado;
  presupuestoEjecutado;
  presupuestoFechaPlanificado;
  presupuestoFechaEjecutado;
  ftesAsignados;
  presupuestoTotal;
  sizeProject
  IdSemDeMeses
  IdSemFinanciero
  ftesEstimadoPm
  ftesRealPm
  healthCheck
  linkPresupuestoFinanciero
  linkPresupuestoFecha
  stateCurrentProject
  customStateProject
  userRol

  
  public donaFinanciadoBudgetLabel: string[] = [" ", " "];
  public donaFinanciadoBudgetData = []
  public donaFinanciadoBudgetChartType = 'doughnut';
  public donaFinanciadoBudgetColor = [{ backgroundColor: ["#FF6384", "#36A2EB"]}];
  public donaFinanciadoBudgetOptions = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white"
      }
    }
  };


  public donaFechaBudgetLabel: string[] = [" ", " "];
  public donaFechaBudgetData = []
  public donaFechaBudgetChartType = 'doughnut';
  public donaFechaBudgetColor = [{ backgroundColor: ["#FF6384", "#36A2EB"] }];
  public donaFechaBudgetOptions = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white"
      }
    }
  };
  currentProjectState: any;

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
  
        this.ultimaModificacion = moment().format("DD/MM/YYYY HH:mm");
        this.mapProjectToModel();
        this.setCharts();
        this.currentProjectState = this.getCurrentProjectState()[0];
      }

    }

  }

  setCharts() {
    this.donaFinanciadoBudgetData = [this.selectedProject.presupuestoFinancPlanificado == null ? 0 : this.selectedProject.presupuestoFinancPlanificado, this.selectedProject.presupuestoFinancEjecutado == null ? 0 : this.selectedProject.presupuestoFinancEjecutado]
    this.donaFechaBudgetData = [this.selectedProject.presupuestoFechaPlanificado == null ? 0 : this.selectedProject.presupuestoFechaPlanificado, this.selectedProject.prespuestoFechaEjecutado == null ? 0 : this.selectedProject.prespuestoFechaEjecutado]
    this.setCardsUnderChart();
  }

  setCardsUnderChart() {

    let presuFinanPlani = this.selectedProject.presupuestoFinancPlanificado == null ? 0 : this.selectedProject.presupuestoFinancPlanificado.replace(/\./g, "").replace(/\,/g, "");
    let presuFinanEjec = this.selectedProject.presupuestoFinancEjecutado == null ? 0 : this.selectedProject.presupuestoFinancEjecutado.replace(/\./g, "").replace(/\,/g, "");

    let presuMesesPlani = this.selectedProject.presupuestoFechaPlanificado == null ? 0 : this.selectedProject.presupuestoFechaPlanificado;
    let presuMesesEjec = this.selectedProject.prespuestoFechaEjecutado == null ? 0 : this.selectedProject.prespuestoFechaEjecutado;

    this.donaFinanciadoBudgetLabel[0] = presuFinanPlani == 0 ? 0.0.toFixed(2) + "%" : (100 - ((presuFinanEjec / presuFinanPlani) * 100)).toFixed(2) + "% ";
    this.donaFinanciadoBudgetLabel[1] = presuFinanPlani == 0 ? 0.0.toFixed(2) + "%" : ((presuFinanEjec / presuFinanPlani) * 100).toFixed(2) + "% "

    this.donaFechaBudgetLabel[0] = presuMesesPlani == 0 ? 0.0.toFixed(2) + "%" : (100 - ((presuMesesEjec / presuMesesPlani) * 100)).toFixed(2) + "% ";
    this.donaFechaBudgetLabel[1] = presuMesesPlani == 0 ? 0.0.toFixed(2) + "%" : ((presuMesesEjec / presuMesesPlani) * 100).toFixed(2) + "% ";
    
    this.donaFinanciadoBudgetData = [(presuFinanPlani - presuFinanEjec), presuFinanEjec]
    this.donaFechaBudgetData = [(presuMesesPlani - presuMesesEjec), presuMesesEjec]

    this.setLights();    
  }

  setLights() {


    $(this.selectedProject.semaforos).each((index, elem) => {
        
        if (elem.idSemFecha) {
          if (this.IdSemDeMeses) {
            this.selectedProject.semaforos[index].semFechaColor = this.getLightColor(parseInt(this.IdSemDeMeses));
            this.selectedProject.semaforos[index].idSemFecha = parseInt(this.IdSemDeMeses);
          }
          else
          {
            this.selectedProject.semaforos[index].semFechaColor = this.getLightColor(parseInt(this.IdSemDeMeses));
            this.selectedProject.semaforos[index].idSemFecha = null;
            this.selectedProject.idSemFecha = null;
          }
        }
        else
        {
          if (this.IdSemDeMeses) {
            this.selectedProject.semaforos[index].semFechaColor = this.getLightColor(parseInt(this.IdSemDeMeses));
            this.selectedProject.semaforos[index].idSemFecha = parseInt(this.IdSemDeMeses);
          }
        }
      });

      $(this.selectedProject.semaforos).each((index, elem) => {
        if (elem.idSemFinan) {
          if (this.IdSemFinanciero) {
            this.selectedProject.semaforos[index].semFinColor = this.getLightColor(parseInt(this.IdSemFinanciero));
            this.selectedProject.semaforos[index].idSemFinan = parseInt(this.IdSemFinanciero);
          }
          else
          {
            this.selectedProject.semaforos[index].semFinColor = this.getLightColor(parseInt(this.IdSemFinanciero));
            this.selectedProject.semaforos[index].idSemFinan = null;
            this.selectedProject.idSemFinan = null;
          }
        }
        else
        {
          if (this.IdSemFinanciero) {
            this.selectedProject.semaforos[index].semFinColor = this.getLightColor(parseInt(this.IdSemFinanciero));
            this.selectedProject.semaforos[index].idSemFinan = parseInt(this.IdSemFinanciero);
          }
        }

      });

  }

  createDate(date) {
    return new Date(date.year, (date.month - 1), date.day);
  }

  formatDateToMoment(date) {
    if (date.year) {
      let datetime = this.createDate(date);
      return moment(datetime, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm");
    }
    return date;

  }

  mapModelToProject() {
    
    this.selectedProject.nombre = this.name;
    this.selectedProject.fechaUltimaModificacion = this.formatDateToMoment(this.ultimaModificacion);
    this.selectedProject.fechaPublicacion = this.formatDateToMoment(this.publicacion);
    this.selectedProject.fechaDraf = this.formatDateToMoment(this.draft);

    this.selectedProject.npv = this.npv;
    this.selectedProject.presupuestoTotal = this.presupuestoTotal;
    this.selectedProject.ftesAsignados = this.ftesAsignados;
    this.selectedProject.irr = this.irr;
    this.selectedProject.saludDescripcion = this.health;
    this.selectedProject.payback = this.payback;
    this.selectedProject.presupuestoFinancPlanificado = this.presupuestoPlanificado;
    this.selectedProject.presupuestoFinancEjecutado = this.presupuestoEjecutado;
    this.selectedProject.presupuestoFechaPlanificado = this.presupuestoFechaPlanificado;
    this.selectedProject.prespuestoFechaEjecutado = this.presupuestoFechaEjecutado;
    this.selectedProject.tamanoProyecto = this.sizeProject;
    this.selectedProject.idSemFecha = this.IdSemDeMeses;
    this.selectedProject.idSemFinan = this.IdSemFinanciero;
    this.selectedProject.ftesEstimadoPm = this.ftesEstimadoPm;
    this.selectedProject.ftesRealPm = this.ftesRealPm;
    
    this.selectedProject.customStateProject = this.customStateProject == "" ? null : this.customStateProject;    

    this.linkPresupuestoFinanciero = this.setHttpUrl(this.linkPresupuestoFinanciero) || "";
    this.selectedProject.linkPresupuestoFinanciero = this.linkPresupuestoFinanciero;

    this.linkPresupuestoFecha = this.setHttpUrl(this.linkPresupuestoFecha) || "";
    this.selectedProject.linkPresupuestoFecha = this.linkPresupuestoFecha;

    this.healthCheck = this.setHttpUrl(this.healthCheck) || "";
    this.selectedProject.healthCheck = this.healthCheck;


    this.setCharts();
  }

  mapProjectToModel() {
    
    this.name = this.selectedProject.nombre;
    this.ultimaModificacion = this.formatDateToMoment(this.selectedProject.fechaUltimaModificacion);
    this.publicacion = this.formatDateToMoment(this.selectedProject.fechaPublicacion);
    this.draft = this.formatDateToMoment(this.selectedProject.fechaDraf);



    this.npv = this.selectedProject.npv;
    this.payback = this.selectedProject.payback;
    this.presupuestoPlanificado = this.selectedProject.presupuestoFinancPlanificado;
    this.presupuestoEjecutado = this.selectedProject.presupuestoFinancEjecutado;
    this.presupuestoTotal = this.selectedProject.presupuestoTotal;


    this.irr = this.selectedProject.irr;
    this.health = this.selectedProject.saludDescripcion;
    this.presupuestoFechaPlanificado = this.selectedProject.presupuestoFechaPlanificado;
    this.presupuestoFechaEjecutado = this.selectedProject.prespuestoFechaEjecutado;
    this.ftesAsignados = this.selectedProject.ftesAsignados;
    this.sizeProject = this.selectedProject.tamanoProyecto;
    this.IdSemDeMeses = this.selectedProject.idSemFecha;
    this.IdSemFinanciero = this.selectedProject.idSemFinan;
    this.ftesEstimadoPm = this.selectedProject.ftesEstimadoPm;
    this.ftesRealPm = this.selectedProject.ftesRealPm;
    this.customStateProject = this.selectedProject.customStateProject;


    this.linkPresupuestoFinanciero = this.setHttpUrl(this.selectedProject.linkPresupuestoFinanciero) || "";
    this.selectedProject.linkPresupuestoFinanciero = this.setHttpUrl(this.selectedProject.linkPresupuestoFinanciero) || "";

    this.linkPresupuestoFecha = this.setHttpUrl(this.selectedProject.linkPresupuestoFecha) || "";
    this.selectedProject.linkPresupuestoFecha = this.setHttpUrl(this.selectedProject.linkPresupuestoFecha) || "";

    this.healthCheck = this.setHttpUrl(this.selectedProject.healthCheck) || "";
    this.selectedProject.healthCheck = this.setHttpUrl(this.selectedProject.healthCheck) || "";

  }
  
  setHttpUrl(url) {

    if (!!url && !!url.trim()) {
      if (!/^(https?:)?\/\//i.test(url)) {
        return 'http://' + url;
      } else
      {
        return url;
      }
    }
  }

  editMode() {
    this.isEditing = true;
    this.mapProjectToModel();
  }

  cancelChanges() {
    this.isEditing = false;
  }

  saveChanges() {

    this.ultimaModificacion = moment().format("DD/MM/YYYY HH:mm");
    this.mapModelToProject();
    this.emitChangesHeader.emit(this.selectedProject);
    this.isEditing = false;
    this.currentProjectState = this.getCurrentProjectState()[0];
  }
  
  getCurrentProjectState() {

    if (this.selectedProject.customStateProject != null) {
      return this.selectedProject.proyectoEtapas.filter(x => x.nombreEtapa == this.selectedProject.customStateProject);
    }
    else {
      return this.selectedProject.proyectoEtapas.filter(x => (x.fechaInicio != null && new Date(x.fechaInicio) <= new Date() && x.vigente == true && x.fechaFin == null)
        || (new Date(x.fechaFin) >= new Date() && new Date(x.fechaInicio) <= new Date() && x.vigente == true));
    }
  }

  getLightColor(id) {
    switch (id) {
      case 1:
        return "#dc3545";
      case 2:
        return "#ffc107";
      case 3:
        return "#28a745";
      default:
        return "#000000";
    } 
  }

  getColorState(state) {

    switch (state.trim().toLocaleLowerCase()) {
      case "rfp/rfi":
        return "colorEstadoRPF p-3 mb-2 bg-primary text-black";
      case "planning":
        return "colorEstadoPlann p-3 mb-2 bg-primary text-black";
      case "inception":
        return "colorEstadoIncept p-3 mb-2 bg-primary text-black";
      case "execution":
        return "colorEstadoExec p-3 mb-2 bg-primary text-black";
      case "post go live":
        return "colorEstadoPost p-3 mb-2 bg-primary text-black";
      case "bau":
        return "colorEstadoB p-3 mb-2 bg-primary text-white";
      case "benefits management":
        return "colorEstadoBenefits p-3 mb-2 bg-primary text-black";
      case "stop":
        return "colorEstadoStop p-3 mb-2 bg-primary text-white";
      case "backlog":
        return "colorEstadoBacklog p-3 mb-2 bg-primary text-white";
      default:
        return "p-3 mb-2 bg-primary text-white";
    }
  }

}
