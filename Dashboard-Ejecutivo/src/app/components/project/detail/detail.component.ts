import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonDataService } from '../../../services/common-data.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { HomeService } from '../../../services/home.service';


declare var $:any

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy  {

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

  public entregablesExecution: any [];
  public avanceExecution: string;
  public fechaFinExecution: string;
  public fechaInicioExecution: string;
  public observacionesExecution: string;

  public entregablesInception: any[];
  public avanceInception: string;
  public fechaFinInception: string;
  public fechaInicioInception: string;
  public observacionesInception: string;

  public entregablesPlanning: any [];
  public avancePlanning: string;
  public fechaFinPlanning: string;
  public fechaInicioPlanning: string;
  public observacionesPlanning: string;

  public entregablesRPF: any [];
  public avanceRPF: string;
  public fechaFinRPF: string;
  public fechaInicioRPF: string;
  public observacionesRPF: string;

  public selectedProject: any;
  currentProjectState: any;  

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public rfpContent = "RFP/RFI";
  public planningContent = "Planning";
  public inceptionContent = "Inception";
  public executionContent = "Execution";
  public postGoLiveContent = "Post Go Live";
  public bauContent = "BAU";
  public benefitsManagementContent = "Benefits Management";

  public activitiesColums = [
    { field: 'descripcion', header: 'Descripción' },
    { field: 'responsable', header: 'Responsable' }
  ];


  public teamColums = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'rol', header: 'Rol' }
  ];
  

  public listActivitiesDelayed: any[];
  public totalActivitiesDelayedRecords = 0;

  public listActivitiesFuture: any[];
  public totalActivitiesFutureRecords = 0;


  public listTeamProject: any[];
  public totalTeamProjectRecords = 0;

  public donaFinanciadoBudgetLabel: string[] = ["", ""];
  public donaFinanciadoBudgetData = []
  public donaFinanciadoBudgetChartType = 'doughnut';
  public donaFinanciadoBudgetColor = [{ backgroundColor: ["#FF6384", "#36A2EB"] }];
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


  public donaFechaBudgetLabel: string[] = ["", ""];
  public donaFechaBudgetData = []
  public donaFechaBudgetChartType = 'doughnut';
  public donaFechaBudgetColor = [{ backgroundColor: ["#FF6384", "#36A2EB"] }];
  public donaFechaBudgetOptions = {
    animation:false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white"
      }
    }
  };

  stateFiltered = [];
  projectRol = [];

  constructor(public _commondata: CommonDataService
    ,private route: ActivatedRoute
    ,public _projectService: ProjectService
    ,private _homeService: HomeService) { }

  ngOnInit() {


    this._homeService.getRoles()
      .subscribe((res: any) => {
        this.projectRol = res;
      })

    setTimeout(_ =>

      this._projectService.getProjectById(this.route.snapshot.paramMap.get('id')).subscribe((project: any) => {

        this.setBarStateProject(project.proyectoEtapas);
        this.setContentState(project.proyectoEtapas, project.proyectoEtapaDocumentos)
        this.setDateProject(project);

        this.selectedProject = this.renderProject(project);

        this.currentProjectState = this.getCurrentProjectState()[0];

        this.setProjectRol();

        
        let presuFinanPlani = this.selectedProject.presupuestoFinancPlanificado == null ? 0 : this.selectedProject.presupuestoFinancPlanificado.replace(".","").replace(",","")
        let presuFinanEjec = this.selectedProject.presupuestoFinancEjecutado == null ? 0 : this.selectedProject.presupuestoFinancEjecutado.replace(".", "").replace(",", "");
        let presuMesesPlani = this.selectedProject.presupuestoFechaPlanificado == null ? 0 : this.selectedProject.presupuestoFechaPlanificado;
        let presuMesesEjec = this.selectedProject.prespuestoFechaEjecutado == null ? 0 : this.selectedProject.prespuestoFechaEjecutado;

        this.donaFinanciadoBudgetLabel[0] = presuFinanPlani == 0 ? 0.0.toFixed(2) + "%" : (100 - ((presuFinanEjec / presuFinanPlani) * 100)).toFixed(2) + "% ";
        this.donaFinanciadoBudgetLabel[1] = presuFinanPlani == 0 ? 0.0.toFixed(2) + "%" : ((presuFinanEjec / presuFinanPlani) * 100).toFixed(2) + "% "

        this.donaFechaBudgetLabel[0] = presuMesesPlani == 0 ? 0.0.toFixed(2) + "%" : (100 - ((presuMesesEjec / presuMesesPlani) * 100)).toFixed(2) + "% ";
        this.donaFechaBudgetLabel[1] = presuMesesPlani == 0 ? 0.0.toFixed(2) + "%" : ((presuMesesEjec / presuMesesPlani) * 100).toFixed(2) + "% ";

        this.donaFinanciadoBudgetData = [(presuFinanPlani - presuFinanEjec), presuFinanEjec]
        this.donaFechaBudgetData = [(presuMesesPlani - presuMesesEjec), presuMesesEjec]

        this.setCountTab(project);


        setTimeout(_ => this._commondata.showLoader(false), 200);
      }), 200);

    
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    window.scroll(0, 0);

  }



  renderProject(project) {

    project.documentTagDownload = [];    
    for (var k = 0; k < project.proyectoEtapas.length; k++) {
      
      let documentosPorEtapa = project.proyectoEtapaDocumentos.filter(x => x.idEtapa == project.proyectoEtapas[k].idEtapa);
      project.documentTagDownload.push({ "documents": documentosPorEtapa, "idEtapa": project.proyectoEtapas[k].idEtapa });
    }
    
    project.presupuestoTotal = this.formatMoney(project.presupuestoTotal);
    project.npv = this.formatMoney(project.npv);
    project.fechaUltimaModificacion = moment(project.fechaUltimaModificacion, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");
    
    this.listActivitiesDelayed = project.actividades.filter(x => x.estado == "Retrasada") || []     
    this.totalActivitiesDelayedRecords = project.actividades.filter(x => x.estado == "Retrasada").length

    this.listActivitiesFuture = project.actividades.filter(x => x.estado == "Próxima") || []
    this.totalActivitiesFutureRecords = project.actividades.filter(x => x.estado == "Próxima").length

    project.listActivitiesDelayed = this.listActivitiesDelayed;
    project.listActivitiesFuture = this.listActivitiesFuture;
    project.presupuestoFinancPlanificado = this.formatMoney(project.presupuestoFinancPlanificado);
    project.presupuestoFinancEjecutado = this.formatMoney(project.presupuestoFinancEjecutado);
    project.payback = this.formatMoney(project.payback, 2);

    if (!!project.healthCheck && !!project.healthCheck.trim()) {
      if (!/^(https?:)?\/\//i.test(project.healthCheck)) {
        project.healthCheck = 'http://' + project.healthCheck;
      }
    }    
    this.stateFiltered = project.proyectoEtapas.slice(0, 7);
    this.listTeamProject = project.equiposPorProyecto;
    this.totalTeamProjectRecords = project.equiposPorProyecto.length;

    return project;

  }

  formatMoney(amount, decimalCount = 0, decimal = ",", thousands = ".") {

      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

  };
  
  setCountTab(project) {
    var tabs = $("input[id^='tab']");
    for (var i = 0; i < tabs.length; i++) {
      
      if ($($(tabs)[i]).next().text().trim() == "Areas afectadas") {
        $($(tabs)[i]).next().text(`Areas afectadas (${project.proyectoAreasAfetadas.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Risks") {
        $($(tabs)[i]).next().text(`Risks (${project.riesgos.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Issues") {
        $($(tabs)[i]).next().text(`Issues (${project.issues.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Equipo") {         
        $($(tabs)[i]).next().text(`Equipo (${project.equiposPorProyecto.filter(x => x.nombre != null && x.nombre != "").length} / ${project.equiposPorProyecto.filter(x => x.rol != null && x.rol != "").length} )`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Actividades retrasadas") {        
        let retrasadas = project.actividades.filter(x => x.estado == "Retrasada").length;
        $($(tabs)[i]).next().text(`Actividades retrasadas (${retrasadas})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Próximas actividades") {
        let proxima = project.actividades.filter(x => x.estado == "Próxima").length;
        $($(tabs)[i]).next().text(`Próximas actividades (${proxima})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Proveedores") {
        $($(tabs)[i]).next().text(`Proveedores (${project.proyectoProveedor.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Documentos") {

       let documents =  $.map(project.proyectoEtapaDocumentos, (x) => {
          if (!x.isFaltaDocumento) {
            return x;
          }
        });

        $($(tabs)[i]).next().text(`Documentos (${documents.length})`);
      }
    }

  }

  setDateProject(project) {
    project.fechaUltimaModificacion = moment(project.fechaUltimaModificacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm");
    project.fechaDraf = moment(project.fechaDraf, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm");
    project.fechaPublicacion  = moment(project.fechaPublicacion, "YYYY/MM/DD").isValid() ? moment(project.fechaPublicacion, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
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

  setToolTip(descriptionState: string,currentState:any) {  

    let fechaInicio = moment(currentState.fechaInicio, "YYYY/MM/DD").isValid() ? moment(currentState.fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
    let fechaFin = moment(currentState.fechaFin, "YYYY/MM/DD").isValid() ? moment(currentState.fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';

    switch (descriptionState) {
      case "rfp/rfi": 
        this.rfpContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "planning":
        this.planningContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "inception":
        this.inceptionContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "execution":
        this.executionContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "post go live":
        this.postGoLiveContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "bau":
        this.bauContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
      case "benefits management":
        this.benefitsManagementContent = `Porcentaje de avance: ${currentState.porcentajeAvance} %  Fecha inicio: ${fechaInicio} Fecha fin: ${fechaFin}`;
        return
    }
  }

  getClasses(className) {
    return className.replace(/\/|\s/g, '');
  }
  
  setProjectRol() {
    
    if (this.selectedProject) {
      $.map(this.projectRol, x => {        
        for (var i = 0; i < this.selectedProject.proyectoRoles.length; i++) {
          if (x.descripcion == this.selectedProject.proyectoRoles[i].descripcion) {
            x.nominado = this.selectedProject.proyectoRoles[i].nominado.trim();
            x.detalleRol = this.selectedProject.proyectoRoles[i].detalleRol.trim();
          }
        }
      });
    }


    setTimeout(_ => {
      var popovers = $('[data-toggle^="popover"]')
      
      $.each(popovers, (index, element) => {
        $(element).popover({
          placement: $(element).text().trim() == "Sponsor" ? 'auto' : 'bottom',
          title: $(element).text().trim(),
          html: true,
          trigger: "hover",
          content: this.getDetailRolByRol($(element).text().trim())
        });
      });

    }, 200);

  }

  getDetailRolByRol(descripcionRol) {
    for (var i = 0; i < this.projectRol.length; i++) {
      if (this.projectRol[i].descripcion == descripcionRol) {
        if (this.projectRol[i].detalleRol) {
          return this.projectRol[i].detalleRol;
        }
        return "";
      }
    }
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
