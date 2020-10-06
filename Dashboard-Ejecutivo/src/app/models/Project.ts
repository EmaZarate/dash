
export class Project {
  id_proyecto: number;
  guid_proyecto: string;
  nombre: string;
  sponsor: string;
  presupuestoTotal: number;
  presupuestoFinancPlanificado: number;
  presupuestoFinancEjecutado: number;
  presupuestoFechaPlanificado: number;
  presupuestoFechaEjecutado: number;
  ftesAsignados: number;
  pm: string;
  ftesEstimadoPm: number;
  ftesRealPm: number;
  tamanoProyecto: string;
  estadoProyecto: string;
  saludDescripcion: string;
  sulduColor: string;
  saludColor: string;
  comentarios: string;
  unidadArt: boolean;
  unidadSegArg: boolean;
  unidadSegUru: boolean;
  unidadRetiro: boolean;
  unidadCajaMutual: boolean;
  unidadServFinanciero: boolean;
  unidadTurismo: boolean;
  unidadAsoServ: boolean;
  fechaDraf: Date;
  fechaPublicacion: Date;
  estadoDashboard: string;
  idSemFecha: number;
  npv: number;
  irr: number;
  payback: number;
  idSemFinam: number;
  etapaNombre: string;
  etapa: {
    id_etapa: number;
    nombre: string
  };
  idSemFechaNavigation: {
    idSemFecha: number;
    color: string;
    minimo: number;
    maximo: number;
  };
  idSemFinanNavigation: {
    idSemFinan: number;
    color: string;
    minimo: number;
    maximo: number;
  };
  proyectoEtapas:any [];
  objetivos:any

}
