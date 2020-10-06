import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }


  exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.processDataToExport(json));
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'Proyectos': worksheet }, SheetNames: ['Proyectos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName +" "+ new Date().getTime() + EXCEL_EXTENSION);
  }

  processDataToExport(listProject) {

    let _this = this;
    listProject = listProject.map(function (project) {
      
      return {       
        
        Nombre: project.nombre,
        Presupuesto: project.presupuestoTotal,
        Tamaño: project.tamanoProyecto,
        Estado: _this.getLastStateProject(project),
        Salud: project.saludDescripcion,
        Objetivos: _this.getObject(project.objetivos),
        NPV: project.npv,
        IRR: project.irr != null ? project.irr + " %" : "0 %",
        Payback: project.payback,
        Fecha_Ultima_Moficicacion: moment(project.fechaUltimaModificacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm"),
        Fecha_De_Draft: moment(project.fechaDraf, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm"),
        Fecha_De_Publicación: moment(project.fechaPublicacion, "YYYY/MM/DD HH:mm").isValid() ? moment(project.fechaPublicacion, "YYYY/MM/DD HH:mm").format("DD/MM/YYYY HH:mm"): '',        
        FTes_Proyecto: project.ftesAsignados,
        Ftes_PM_Estimados: project.ftesEstimadoPm == null ? "" : project.ftesEstimadoPm,
        Ftes_PM_Reales: project.ftesRealPm == null ? "" : project.ftesRealPm,
        Presupuesto_Financiero: project.presupuestoFinancPlanificado == null ? "" : project.presupuestoFinancPlanificado,
        Total_Planificado: project.presupuestoFinancPlanificado == null ? "" : project.presupuestoFinancPlanificado,
        Total_Ejecutado: project.presupuestoFinancEjecutado == null ? "" : project.presupuestoFinancEjecutado,
        Presupuesto_Fecha: project.presupuestoFechaPlanificado == null ? "" : project.presupuestoFechaPlanificado,
        Total_Planificado_Fecha: project.presupuestoFechaPlanificado == null ? "" : project.presupuestoFechaPlanificado,
        Total_Ejecutadop_Fecha: project.prespuestoFechaEjecutado == null ? "" : project.prespuestoFechaEjecutado,
        Sponsor: project.sponsor,
        PM: _this.getRol(project, "PM"),
        Arquitecto: _this.getRol(project,"Architect"),
        Business_Partner: _this.getRol(project,"Bussines Partner"),
        Owner: _this.getRol(project,"Product Owner"),
        Asociart: project.unidadArt ? "SI": "NO",
        Argentina: project.unidadSegArg ? "SI" : "NO",
        Uruguay: project.unidadSegUru ? "SI" : "NO",
        Retiro: project.unidadRetiro ? "SI" : "NO",
        Caja_Mutual: project.unidadCajaMutual ? "SI" : "NO",
        Servicios_Financiero: project.unidadServFinanciero ? "SI" : "NO",
        Turismo: project.unidadTurismo ? "SI" : "NO",
        Asociart_Servicios: project.unidadAsoServ ? "SI" : "NO",
        Areas_Afectadas: _this.getAreaAffected(project)
      }
    });

    return listProject;
  }

  getLastStateProject(project) {
    return project.proyectoEtapas.filter(x => ((x.fechaFin == null ? null : new Date(x.fechaFin)) == null && x.fechaInicio != null && new Date(x.fechaInicio) <= new Date()) || (new Date(x.fechaFin) >= new Date() && new Date(x.fechaInicio) <= new Date())).map(function (x) {
      return x.nombreEtapa.trim()
    })[0] || "";
  }

  getRol(project,descripcionRol) {

    for (var i = 0; i < project.proyectoRoles.length; i++) {
      if (project.proyectoRoles[i].descripcion == descripcionRol) {
        if (project.proyectoRoles[i].nominado) {
          return project.proyectoRoles[i].nominado.trim();
        }
        return "";
      }
    }
  }

  getObject(objects) {
    return (objects).map(function (k) { return k.descripcion }).join(",");           
  }

  getAreaAffected(project) {    
    return Object.keys(project.proyectoAreasAfetadas).map(function (k) { return project.proyectoAreasAfetadas[k].nombre }).join(",");           
  }
}
