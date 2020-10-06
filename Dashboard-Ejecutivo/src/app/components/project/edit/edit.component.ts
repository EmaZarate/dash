import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../services/common-data.service';
import { ProjectService } from '../../../services/project.service';
import { HomeService } from '../../../services/home.service';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public entregablesBenefits: any[];
  public avanceBenefits: string;
  public fechaFinBenefits: string;
  public fechaInicioBenefits: string;
  public entregablesBAU: any[];
  public avanceBAU: string;
  public fechaFinBAU: string;
  public fechaInicioBAU: string;
  public entregablesPostGoLive: any[];
  public avancePostGoLive: string;
  public fechaFinPostGoLive: string;
  public fechaInicioPostGoLive: string;
  public entregablesExecution: any [];
  public avanceExecution: string;
  public fechaFinExecution: string;
  public fechaInicioExecution: string;
  public entregablesInception: any[];
  public avanceInception: string;
  public fechaFinInception: string;
  public fechaInicioInception: string;
  public entregablesPlanning: any [];
  public avancePlanning: string;
  public fechaFinPlanning: string;
  public fechaInicioPlanning: string;
  public entregablesRPF: any [];
  public avanceRPF: string;
  public fechaFinRPF: string;
  public fechaInicioRPF: string;
  public selectedProject: any;
  
  public proveedores = [];
  public areas =  [];

  public risksMappedToComponent;
  public issuesMappedToComponent;
  public actividadesMappedToComponent;
  public equiposMappedToComponent;

  public proximasActividades;
  public retrasadasActividades;

  constructor(
    private _commonDataService: CommonDataService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);
    setTimeout(() => {

      this._projectService.getProjectById(this.route.snapshot.paramMap.get('id')).subscribe((project: any) => {

        this.setDateProject(project);

        this.mapRisks(project.riesgos);
        this.mapIssues(project.issues);
        this.mapActividades(project.actividades);
        this.mapEquipos(project.equiposPorProyecto);


        
        project.presupuestoFinancPlanificado = this.formatMoney(project.presupuestoFinancPlanificado);
        project.presupuestoFinancEjecutado = this.formatMoney(project.presupuestoFinancEjecutado);
        project.payback = this.formatMoney(project.payback, 2);
        project.presupuestoTotal = this.formatMoney(project.presupuestoTotal);
        project.npv = this.formatMoney(project.npv);


        this.selectedProject = project;


        this.setCountTab(project);
        setTimeout(_ => this._commonDataService.showLoader(false), 200);

        setTimeout(() => {
          this.setContentState(project.proyectoEtapas, project.proyectoEtapaDocumentos)
        }, 250);

      });

    }, 250);

    this._homeService.getProveedores()
      .subscribe((res: any) => {
        this.proveedores = res;
      });

    this._homeService.getAreas()
      .subscribe((res: any) => {
        this.areas = res.map(el => {
          return {
            idArea: el.idAreasAfectadas,
            idProyecto: el.idProyecto,
            nombre: el.nombre
          };
        });
      })
  }

  formatMoney(amount, decimalCount = 0, decimal = ",", thousands = ".") {

    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

  }

  mapRisks(risks){
    this.risksMappedToComponent = (risks as Array<any>).map((el) => {
      return {
        id: el.idRisks,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
  }

  mapIssues(issues){
    this.issuesMappedToComponent = (issues as Array<any>).map((el) => {
      return {
        id: el.idIssue,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
  }

  mapActividades(actividades){
    this.proximasActividades = (actividades as Array<any>).filter(x => x.estado == "Próxima");
    this.retrasadasActividades = (actividades as Array<any>).filter(x => x.estado == "Retrasada");

    this.actividadesMappedToComponent = (actividades as Array<any>).map((el) => {
      return {
        id: el.idActividad,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
  }

  mapEquipos(equipos){
    this.equiposMappedToComponent = equipos.map((el) => {
      return {
        id: el.idEquipoPorProyecto,
        idProyecto: el.idProyecto,
        nombre: el.nombre,
        rol: el.rol,
        idRol:el.idRol
      };
    });
  }

  ngAfterViewInit() {
    window.scroll(0, 0);

  }

  setDateProject(project) {

    
    project.fechaUltimaModificacion = moment(project.fechaUltimaModificacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm");
    project.fechaDraf = moment(project.fechaDraf, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm");
    project.fechaPublicacion  =  moment(project.fechaPublicacion, "YYYY/MM/DD").isValid() ? moment(project.fechaPublicacion, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
  }

  saveChanges(modifiedProject) {
    
    this._commonDataService.showLoader(true);
    modifiedProject.fechaUltimaModificacion = modifiedProject.fechaUltimaModificacion != '' ? moment(modifiedProject.fechaUltimaModificacion, "DD/MM/YYYY HH:mm").format("YYYY/MM/DD HH:mm") : '';
    modifiedProject.fechaDraf = modifiedProject.fechaDraf != '' ? moment(modifiedProject.fechaDraf, "DD/MM/YYYY HH:mm").format("YYYY/MM/DD HH:mm"): '';
    modifiedProject.fechaPublicacion = modifiedProject.fechaPublicacion != '' ? moment(modifiedProject.fechaPublicacion, "DD/MM/YYYY HH:mm").format("YYYY/MM/DD HH:mm"): '';
    
    modifiedProject.npv = modifiedProject.npv.replace(/\./g, ",");
    modifiedProject.payback = modifiedProject.payback.replace(/\,/g, ".");
    modifiedProject.presupuestoFinancPlanificado = modifiedProject.presupuestoFinancPlanificado.replace(/\./g, ",");
    modifiedProject.presupuestoFinancEjecutado = modifiedProject.presupuestoFinancEjecutado.replace(/\./g, ",");
    modifiedProject.presupuestoTotal = modifiedProject.presupuestoTotal.replace(/\./g, ",");

    this._projectService.updateProject(modifiedProject)
      .subscribe(() => {
        this._commonDataService.showLoader(false);        
        modifiedProject.fechaUltimaModificacion = modifiedProject.fechaUltimaModificacion != '' ? moment(modifiedProject.fechaUltimaModificacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm") : '';
        modifiedProject.fechaDraf = modifiedProject.fechaDraf != '' ? moment(modifiedProject.fechaDraf, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY") : '';
        modifiedProject.fechaPublicacion = modifiedProject.fechaPublicacion != '' ? moment(modifiedProject.fechaPublicacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY") : '';

        modifiedProject.npv = modifiedProject.npv.replace(/\,/g, ".");
        modifiedProject.payback = modifiedProject.payback.replace(/\./g, ",");
        modifiedProject.presupuestoFinancPlanificado = modifiedProject.presupuestoFinancPlanificado.replace(/\,/g, ".");
        modifiedProject.presupuestoFinancEjecutado = modifiedProject.presupuestoFinancEjecutado.replace(/\,/g, ".");
        modifiedProject.presupuestoTotal = modifiedProject.presupuestoTotal.replace(/\,/g, ".");

      });
  }

  setContentState(proyectoEtapas, proyectoEtapaDocumentos) {


    for (var i = 0; i < proyectoEtapas.length; i++) {
      switch (proyectoEtapas[i].nombreEtapa.toLocaleLowerCase().trim()) {
        case "rfp/rfi":
          
          this.fechaInicioRPF = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinRPF = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceRPF = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesRPF = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "planning":
          this.fechaInicioPlanning = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinPlanning = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avancePlanning = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesPlanning = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "inception":
          this.fechaInicioInception = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinInception = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceInception = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesInception = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "execution":
          this.fechaInicioExecution = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinExecution = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceExecution = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesExecution = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "post go live":
          this.fechaInicioPostGoLive = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinPostGoLive = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avancePostGoLive = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesPostGoLive = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "bau":
          this.fechaInicioBAU = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinBAU = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceBAU = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesBAU = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
        case "benefits management":
          this.fechaInicioBenefits = moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaInicio, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.fechaFinBenefits = moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").isValid() ? moment(proyectoEtapas[i].fechaFin, "YYYY/MM/DD").format("DD/MM/YYYY") : '';
          this.avanceBenefits = proyectoEtapas[i].porcentajeAvance + " %";
          this.entregablesBenefits = proyectoEtapaDocumentos.filter(x => x.idEtapa == proyectoEtapas[i].idEtapa)
          break
      }
    }

  }

  submitRisks(risks){
    this.selectedProject.riesgos = risks.map((el) => {
      return {
        idRisks: el.id ? el.id : 0,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
    this.saveChanges(this.selectedProject);
    this.setCountTab(this.selectedProject);
  }

  submitEquipos(teams){
    this.selectedProject.equiposPorProyecto = teams.map((el) => {
      return {
        idEquipoPorProyecto: el.id,
        idProyecto: el.idProyecto,
        nombre: el.nombre,
        rol: el.rol,
        idRol: el.idRol
      };
    })

    this.saveChanges(this.selectedProject);
    this.setCountTab(this.selectedProject);
  }

  submitIssues(issues){
    this.selectedProject.issues = issues.map((el) => {
      return {
        idIssue: el.id ? el.id : 0,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
    this.saveChanges(this.selectedProject);
    this.setCountTab(this.selectedProject);
  }

  submitActividades(actividades){
    this.selectedProject.actividades = actividades.map((el) => {
      return {
        idActividad: el.id ? el.id : 0,
        descripcion: el.descripcion,
        idProyecto: el.idProyecto
      }
    });
    this.saveChanges(this.selectedProject);
    this.setCountTab(this.selectedProject);
  }

  submitNextActivities(actividades){
    this.selectedProject.actividades = [...this.retrasadasActividades, ...actividades];

    this.saveChanges(this.selectedProject);
    this.mapActividades(this.selectedProject.actividades);
    this.setCountTab(this.selectedProject);
  }

  submitDelayedActivities(actividades){
    this.selectedProject.actividades = [...this.proximasActividades, ...actividades];

    this.saveChanges(this.selectedProject); 
    this.mapActividades(this.selectedProject.actividades);
    this.setCountTab(this.selectedProject);
  }

  submitOtherDocuments(documents){
    this.selectedProject.proyectoEtapaDocumentos = documents;
    this.saveChanges(this.selectedProject);
    this.setCountTab(this.selectedProject);
  }
  
  setCountTab(project) {
    var tabs = $("input[id^='tab']");
    for (var i = 0; i < tabs.length; i++) {
      
      if ($($(tabs)[i]).next().text().trim() == "Areas afectadas" || $($(tabs)[i]).next().text().trim().includes("Areas afectadas")) {
        $($(tabs)[i]).next().text(`Areas afectadas (${project.proyectoAreasAfetadas.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Risks" || $($(tabs)[i]).next().text().trim().includes("Risks")) {
        $($(tabs)[i]).next().text(`Risks (${project.riesgos.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Issues" || $($(tabs)[i]).next().text().trim().includes("Issues")) {
        $($(tabs)[i]).next().text(`Issues (${project.issues.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Equipo" || $($(tabs)[i]).next().text().trim().includes("Equipo")) {
        $($(tabs)[i]).next().text(`Equipo (${project.equiposPorProyecto.filter(x => x.nombre != null && x.nombre != "").length} / ${project.equiposPorProyecto.filter(x => x.rol != null && x.rol != "").length} )`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Actividades retrasadas" || $($(tabs)[i]).next().text().trim().includes("Actividades retrasadas")) {        
        let retrasadas = project.actividades.filter(x => x.estado == "Retrasada").length;
        $($(tabs)[i]).next().text(`Actividades retrasadas (${retrasadas})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Próximas actividades" || $($(tabs)[i]).next().text().trim().includes("Próximas actividades")) {
        let proxima = project.actividades.filter(x => x.estado == "Próxima").length;
        $($(tabs)[i]).next().text(`Próximas actividades (${proxima})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Proveedores" || $($(tabs)[i]).next().text().trim().includes("Proveedores")) {
        $($(tabs)[i]).next().text(`Proveedores (${project.proyectoProveedor.length})`);
      }
      else if ($($(tabs)[i]).next().text().trim() == "Documentos" || $($(tabs)[i]).next().text().trim().includes("Documentos")) {

       let documents =  $.map(project.proyectoEtapaDocumentos, (x) => {
          if (!x.isFaltaDocumento) {
            return x;
          }
        });

        $($(tabs)[i]).next().text(`Documentos (${documents.length})`);
      }
    }

  }

}
