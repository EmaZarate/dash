import { Project } from "../models/Project";
var project: Project = new Project()

project.id_proyecto = 1;
project.nombre = "Dynamo II"  ;
project.sponsor = "Tecnología";
project.presupuestoTotal = 1019191;
project.presupuestoFinancPlanificado= 50;
project.presupuestoFinancEjecutado = 30;
project.presupuestoFechaPlanificado = 30;
project.presupuestoFechaEjecutado = 20;
project.ftesAsignados = 12;
project.pm = "Arnaldo Viera";
project.ftesEstimadoPm = 15;
project.ftesRealPm = 60;
project.tamanoProyecto = "Grande";
project.estadoProyecto = "Estado del proyecto 1";
project.saludDescripcion = "Critico";
project.saludColor = "#dc3545";
project.comentarios = "Comentarios del proyecto 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus metus imperdiet vulputate laoreet. Vivamus vel interdum erat, at commodo justo. Suspendisse sed enim ut risus vulputate accumsan sed et dolor. Sed sit amet aliquet ipsum, non suscipit ipsum. Maecenas sit amet nunc egestas, sagittis diam at, ornare tortor.";
project.unidadArt = false;
project.unidadSegArg = true;
project.unidadSegUru = false;
project.unidadRetiro = false;
project.unidadCajaMutual = false;
project.unidadServFinanciero = false;
project.unidadTurismo = false;
project.unidadAsoServ = false;
project.fechaDraf = new Date();
project.fechaPublicacion = new Date();
project.estadoDashboard = "draft";
project.idSemFecha = 1;
project.idSemFinam = 1;
project.npv = 20;
project.irr = 40;
project.payback = 50;
project.idSemFechaNavigation = {
    idSemFecha: 1,
    color: '#2AFE00',
    minimo: 12,
    maximo: 30
};
project.idSemFinanNavigation = {
    idSemFinan: 1,
    color: '#FE0000',
    minimo: 12,
    maximo: 30
}
project.objetivos = []
project.etapaNombre = "Post Go Live";
project.etapa ={
    id_etapa:1,
  nombre: "Post Go Live"
}

//var project1: Project = new Project()

//project1.id_proyecto = 1;
//project1.nombre = "TBO";
//project1.sponsor = "Julian Ali";
//project1.presupuestoTotal = 954440;
//project1.presupuestoFinancPlanificado= 50;
//project1.presupuestoFinancEjecutado = 30;
//project1.presupuestoFechaPlanificado = 30;
//project1.presupuestoFinancEjecutado = 20;
//project1.ftesAsignados = 12;
//project1.pm = "Cristian Stolarowa";
//project1.ftesEstimadoPm = 15;
//project1.ftesRealPm = 60;
//project1.tamanoProyecto = "Chico";
//project1.estadoProyecto = "Estado del proyecto";
//project1.saludDescripcion = "Con problemas";
//project1.saludColor = "#ffc107";
//project1.comentarios = "Comentarios";
//project1.unidadArt = false;
//project1.unidadSegArg = true;
//project1.unidadSegUru = false;
//project1.unidadRetiro = false;
//project1.unidadCajaMutual = true;
//project1.unidadServFinanciero = false;
//project1.unidadTurismo = true;
//project1.unidadAsoServ = true;
//project1.fechaDraf = new Date();
//project1.fechaPublicacion = new Date();
//project1.estadoDashboard = "draft";
//project1.idSemFecha = 1;
//project1.idSemFinam = 1;
//project1.npv = 30;
//project1.irr = 10;
//project1.payback = 25;
//project1.semFecha = {
//    idSemFecha: 1,
//    color: '#000000',
//    minimo: 12,
//    maximo: 30
//};
//project1.semFinanciero = {
//    idSemFinan: 1,
//    color: '#0032FE',
//    minimo: 12,
//    maximo: 30
//}
//project1.objetivos = [
//    {
//        id_objetivo: 1,
//        descripcion: 'Primer obetivo del proyecto'
//    }
//]
//project1.etapaNombre = "Execution";
//project1.etapa ={
//    id_etapa:1,
//    nombre: "Execution"
//}

//var project2: Project = new Project()

//project2.id_proyecto = 1;
//project2.nombre = "ALM Fast Track";
//project2.sponsor = "Eduardo Sangermano";
//project2.presupuestoTotal = 50047;
//project2.presupuestoFinancPlanificado= 50;
//project2.presupuestoFinancEjecutado = 30;
//project2.presupuestoFechaPlanificado = 30;
//project2.presupuestoFinancEjecutado = 20;
//project2.ftesAsignados = 12;
//project2.pm = "";
//project2.ftesEstimadoPm = 15;
//project2.ftesRealPm = 60;
//project2.tamanoProyecto = "Grande";
//project2.estadoProyecto = "Estado del proyecto";
//project2.saludDescripcion = "Con problemas";
//project2.saludColor = "#ffc107";
//project2.comentarios = "Verificar con Geronimo Schlieper";
//project2.unidadArt = true;
//project2.unidadSegArg = true;
//project2.unidadSegUru = true;
//project2.unidadRetiro = true;
//project2.unidadCajaMutual = true;
//project2.unidadServFinanciero = true;
//project2.unidadTurismo = true;
//project2.unidadAsoServ = true;
//project2.fechaDraf = new Date();
//project2.fechaPublicacion = new Date();
//project2.estadoDashboard = "draft";
//project2.idSemFecha = 1;
//project2.idSemFinam = 1;
//project2.npv = 5;
//project2.irr = 90;
//project2.payback = 60;
//project2.semFecha = {
//    idSemFecha: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//};
//project2.semFinanciero = {
//    idSemFinan: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//}
//project2.objetivos = []
//project2.etapaNombre = "Execution";
//project2.etapa ={
//    id_etapa:1,
//    nombre: "Planning"
//}

//var project4: Project = new Project()

//project4.id_proyecto = 1;
//project4.nombre = "Gestión Integral de Riesgos";
//project4.sponsor = "Eduardo Sangermano";
//project4.presupuestoTotal = 10000;
//project4.presupuestoFinancPlanificado= 50;
//project4.presupuestoFinancEjecutado = 30;
//project4.presupuestoFechaPlanificado = 30;
//project4.presupuestoFinancEjecutado = 20;
//project4.ftesAsignados = 12;
//project4.pm = "";
//project4.ftesEstimadoPm = 15;
//project4.ftesRealPm = 60;
//project4.tamanoProyecto = "Medio";
//project4.estadoProyecto = "Estado del proyecto";
//project4.saludDescripcion = "Con problemas";
//project4.saludColor = "#ffc107";
//project4.comentarios = "Verificar con Geronimo Schlieper";
//project4.unidadArt = true;
//project4.unidadSegArg = true;
//project4.unidadSegUru = true;
//project4.unidadRetiro = true;
//project4.unidadCajaMutual = true;
//project4.unidadServFinanciero = true;
//project4.unidadTurismo = true;
//project4.unidadAsoServ = true;
//project4.fechaDraf = new Date();
//project4.fechaPublicacion = new Date();
//project4.estadoDashboard = "draft";
//project4.idSemFecha = 1;
//project4.idSemFinam = 1;
//project4.npv = 20;
//project4.irr = 40;
//project4.payback = 50;
//project4.semFecha = {
//    idSemFecha: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//};
//project4.semFinanciero = {
//    idSemFinan: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//}
//project4.objetivos = []
//project4.etapaNombre = "Execution";
//project4.etapa ={
//    id_etapa:1,
//    nombre: "Planning"
//}

//var project3: Project = new Project()

//project3.id_proyecto = 1;
//project3.nombre = "Campaña Servicio Financiero";
//project3.sponsor = "Serv.Financieros";
//project3.presupuestoTotal = 10;
//project3.presupuestoFinancPlanificado= 50;
//project3.presupuestoFinancEjecutado = 30;
//project3.presupuestoFechaPlanificado = 30;
//project3.presupuestoFechaEjecutado = 20;
//project3.ftesAsignados = 12;
//project3.pm = "Romina Barrionuevo";
//project3.ftesEstimadoPm = 15;
//project3.ftesRealPm = 60;
//project3.tamanoProyecto = "Grande";
//project3.estadoProyecto = "Estado del proyecto";
//project3.saludDescripcion = "Buena Salud";
//project3.saludColor = "#28a745";
//project3.comentarios = "Comentarios";
//project3.unidadArt = true;
//project3.unidadSegArg = true;
//project3.unidadSegUru = false;
//project3.unidadRetiro = true;
//project3.unidadCajaMutual = true;
//project3.unidadServFinanciero = false;
//project3.unidadTurismo = false;
//project3.unidadAsoServ = true;
//project3.fechaDraf = new Date();
//project3.fechaPublicacion = new Date();
//project3.estadoDashboard = "draft";
//project3.idSemFecha = 1;
//project3.idSemFinam = 1;
//project3.npv = 20;
//project3.irr = 88;
//project3.payback = 50;
//project3.semFecha = {
//    idSemFecha: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//};
//project3.semFinanciero = {
//    idSemFinan: 1,
//    color: '#00000',
//    minimo: 12,
//    maximo: 30
//}
//project3.objetivos = []
//project3.etapaNombre = "Planning";
//project3.etapa ={
//    id_etapa:1,
//  nombre: "Planning"
//}


//var project5: Project = new Project()

//project5.id_proyecto = 1;
//project5.nombre = "Proyecto Banco Macro";
//project5.sponsor = "Eduardo Sangermano";
//project5.presupuestoTotal = 10;
//project5.presupuestoFinancPlanificado = 50;
//project5.presupuestoFinancEjecutado = 30;
//project5.presupuestoFechaPlanificado = 30;
//project5.presupuestoFechaEjecutado = 20;
//project5.ftesAsignados = 12;
//project5.pm = "Romina Barrionuevo";
//project5.ftesEstimadoPm = 15;
//project5.ftesRealPm = 60;
//project5.tamanoProyecto = "Grande";
//project5.estadoProyecto = "Estado del proyecto";
//project5.saludDescripcion = "Buena Salud";
//project5.saludColor = "#28a745";
//project5.comentarios = "Comentarios";
//project5.unidadArt = false;
//project5.unidadSegArg = true;
//project5.unidadSegUru = false;
//project5.unidadRetiro = false;
//project5.unidadCajaMutual = false;
//project5.unidadServFinanciero = false;
//project5.unidadTurismo = false;
//project5.unidadAsoServ = false;
//project5.fechaDraf = new Date();
//project5.fechaPublicacion = new Date();
//project5.estadoDashboard = "draft";
//project5.idSemFecha = 1;
//project5.idSemFinam = 1;
//project5.npv = 20;
//project5.irr = 88;
//project5.payback = 50;
//project5.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project5.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project5.objetivos = [
//  {
//    id_objetivo: 1,
//    descripcion: 'Disponibilizar una herramienta de cotización de seguros para los ejecutivos de Banco Macro'
//  }]
//project5.etapaNombre = "Execution";
//project5.etapa = {
//  id_etapa: 1,
//  nombre: "Execution"
//}

//var project6: Project = new Project()

//project6.id_proyecto = 1;
//project6.nombre = "Gestión de Proveedores";
//project6.sponsor = "Jorge Cuenca"
//project6.presupuestoTotal = 10;
//project6.presupuestoFinancPlanificado = 50;
//project6.presupuestoFinancEjecutado = 30;
//project6.presupuestoFechaPlanificado = 30;
//project6.presupuestoFechaEjecutado = 20;
//project6.ftesAsignados = 12;
//project6.pm = "Romina Barrionuevo";
//project6.ftesEstimadoPm = 15;
//project6.ftesRealPm = 60;
//project6.tamanoProyecto = "Grande";
//project6.estadoProyecto = "Estado del proyecto";
//project6.saludDescripcion = "Buena Salud";
//project6.saludColor = "#28a745";
//project6.comentarios = "Comentarios";
//project6.unidadArt = false;
//project6.unidadSegArg = true;
//project6.unidadSegUru = false;
//project6.unidadRetiro = false;
//project6.unidadCajaMutual = false;
//project6.unidadServFinanciero = false;
//project6.unidadTurismo = false;
//project6.unidadAsoServ = false;
//project6.fechaDraf = new Date();
//project6.fechaPublicacion = new Date();
//project6.estadoDashboard = "draft";
//project6.idSemFecha = 1;
//project6.idSemFinam = 1;
//project6.npv = 20;
//project6.irr = 88;
//project6.payback = 50;
//project6.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project6.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project6.objetivos = [{
//    id_objetivo: 1,
//    descripcion: 'Gestionar activamente las adquisiciones de todas las áreas funcionales'
//  }]
//project6.etapaNombre = "Planning";
//project6.etapa = {
//  id_etapa: 1,
//  nombre: "Planning"
//}


//var project7: Project = new Project()

//project7.id_proyecto = 1;
//project7.nombre = "Transformación de Caja Mutual";
//project7.sponsor = "Maria Marta Nadeo"
//project7.presupuestoTotal = 0;
//project7.presupuestoFinancPlanificado = 50;
//project7.presupuestoFinancEjecutado = 30;
//project7.presupuestoFechaPlanificado = 30;
//project7.presupuestoFechaEjecutado = 20;
//project7.ftesAsignados = 12;
//project7.pm = "Romina Barrionuevo";
//project7.ftesEstimadoPm = 15;
//project7.ftesRealPm = 60;
//project7.tamanoProyecto = "Grande";
//project7.estadoProyecto = "Estado del proyecto";
//project7.saludDescripcion = "Buena Salud";
//project7.saludColor = "#28a745";
//project7.comentarios = "Comentarios";
//project7.unidadArt = false;
//project7.unidadSegArg = false;
//project7.unidadSegUru = false;
//project7.unidadRetiro = false;
//project7.unidadCajaMutual = true;
//project7.unidadServFinanciero = false;
//project7.unidadTurismo = false;
//project7.unidadAsoServ = false;
//project7.fechaDraf = new Date();
//project7.fechaPublicacion = new Date();
//project7.estadoDashboard = "draft";
//project7.idSemFecha = 1;
//project7.idSemFinam = 1;
//project7.npv = 20;
//project7.irr = 88;
//project7.payback = 50;
//project7.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project7.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project7.objetivos = [{
//  id_objetivo: 1,
//  descripcion: 'Transformar el  core del negocio de CM'
//}]
//project7.etapaNombre = "Planning";
//project7.etapa = {
//  id_etapa: 1,
//  nombre: "Planning"
//}

//var project8: Project = new Project()

//project8.id_proyecto = 1;
//project8.nombre = "Modelo de Gestion de Siniestros de Cola Larga";
//project8.sponsor = "Seguros Siniestros"
//project8.presupuestoTotal = 0;
//project8.presupuestoFinancPlanificado = 50;
//project8.presupuestoFinancEjecutado = 30;
//project8.presupuestoFechaPlanificado = 30;
//project8.presupuestoFechaEjecutado = 20;
//project8.ftesAsignados = 12;
//project8.pm = "Romina Barrionuevo";
//project8.ftesEstimadoPm = 15;
//project8.ftesRealPm = 60;
//project8.tamanoProyecto = "Chico";
//project8.estadoProyecto = "Estado del proyecto";
//project8.saludDescripcion = "Buena Salud";
//project8.saludColor = "#28a745";
//project8.comentarios = "Comentarios";
//project8.unidadArt = false;
//project8.unidadSegArg = true;
//project8.unidadSegUru = false;
//project8.unidadRetiro = false;
//project8.unidadCajaMutual = false;
//project8.unidadServFinanciero = false;
//project8.unidadTurismo = false;
//project8.unidadAsoServ = false;
//project8.fechaDraf = new Date();
//project8.fechaPublicacion = new Date();
//project8.estadoDashboard = "draft";
//project8.idSemFecha = 1;
//project8.idSemFinam = 1;
//project8.npv = 20;
//project8.irr = 88;
//project8.payback = 50;
//project8.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project8.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project8.objetivos = [{
//  id_objetivo: 1,
//  descripcion: 'Diseñar e Implementar un modelo de valuación de siniestros'
//}]
//project8.etapaNombre = "Execution";
//project8.etapa = {
//  id_etapa: 1,
//  nombre: "Execution"
//}

//var project9: Project = new Project()

//project9.id_proyecto = 1;
//project9.nombre = "Viajes y Turismo";
//project9.sponsor = "Viajes y Turismo"
//project9.presupuestoTotal = 0;
//project9.presupuestoFinancPlanificado = 50;
//project9.presupuestoFinancEjecutado = 30;
//project9.presupuestoFechaPlanificado = 30;
//project9.presupuestoFechaEjecutado = 20;
//project9.ftesAsignados = 12;
//project9.pm = "Romina Barrionuevo";
//project9.ftesEstimadoPm = 15;
//project9.ftesRealPm = 60;
//project9.tamanoProyecto = "Chico";
//project9.estadoProyecto = "Estado del proyecto";
//project9.saludDescripcion = "Buena Salud";
//project9.saludColor = "#28a745";
//project9.comentarios = "";
//project9.unidadArt = false;
//project9.unidadSegArg = false;
//project9.unidadSegUru = false;
//project9.unidadRetiro = false;
//project9.unidadCajaMutual = false;
//project9.unidadServFinanciero = false;
//project9.unidadTurismo = true;
//project9.unidadAsoServ = false;
//project9.fechaDraf = new Date();
//project9.fechaPublicacion = new Date();
//project9.estadoDashboard = "draft";
//project9.idSemFecha = 1;
//project9.idSemFinam = 1;
//project9.npv = 20;
//project9.irr = 88;
//project9.payback = 50;
//project9.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project9.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project9.objetivos = []
//project9.etapaNombre = "Planning";
//project9.etapa = {
//  id_etapa: 1,
//  nombre: "Planning"
//}

//var project10: Project = new Project()

//project10.id_proyecto = 1;
//project10.nombre = "Portfolio Integrado de Productos"
//project10.sponsor = "Luciano Pazzel"
//project10.presupuestoTotal = 1119300;
//project10.presupuestoFinancPlanificado = 50;
//project10.presupuestoFinancEjecutado = 30;
//project10.presupuestoFechaPlanificado = 30;
//project10.presupuestoFechaEjecutado = 20;
//project10.ftesAsignados = 12;
//project10.pm = "Carlos de los Santos";
//project10.ftesEstimadoPm = 15;
//project10.ftesRealPm = 60;
//project10.tamanoProyecto = "Chico";
//project10.estadoProyecto = "Estado del proyecto";
//project10.saludDescripcion = "Buena Salud";
//project10.saludColor = "#28a745";
//project10.comentarios = "";
//project10.unidadArt = false;
//project10.unidadSegArg = true;
//project10.unidadSegUru = false;
//project10.unidadRetiro = false;
//project10.unidadCajaMutual = false;
//project10.unidadServFinanciero = false;
//project10.unidadTurismo = false;
//project10.unidadAsoServ = false;
//project10.fechaDraf = new Date();
//project10.fechaPublicacion = new Date();
//project10.estadoDashboard = "draft";
//project10.idSemFecha = 1;
//project10.idSemFinam = 1;
//project10.npv = 20;
//project10.irr = 88;
//project10.payback = 50;
//project10.semFecha = {
//  idSemFecha: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//};
//project10.semFinanciero = {
//  idSemFinan: 1,
//  color: '#00000',
//  minimo: 12,
//  maximo: 30
//}
//project10.objetivos = [{
//  id_objetivo: 1,
//  descripcion: 'Consolidar la oferta de productos del grupo, a partir de identificar posibles sinergias, en base al diagnóstico del estado actual.'
//}]
//project10.etapaNombre = "Execution";
//project10.etapa = {
//  id_etapa: 1,
//  nombre: "Execution"
//}

export var Projects: Project[] = [project]// project1, project2, project3, project4, project5, project6, project7, project8, project9, project10]





