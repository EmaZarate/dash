using AutoMapper;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Helpers;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Implementations
{
  public class ProjectService : IProjectService
  {
    private dashboardejecutivo_devContext _ctx;

    private readonly IConfiguration _config;
    private readonly IMapper _mapper;

    private Dictionary<string,int> STATE_PROJECT = new Dictionary<string,int>();

    public ProjectService(dashboardejecutivo_devContext ctx, IConfiguration configuration, IMapper mapper)
    {
      _ctx = ctx;
      _config = configuration;
      _mapper = mapper;

      STATE_PROJECT.Add("RFP/RFI", 1);
      STATE_PROJECT.Add("Inception", 2);
      STATE_PROJECT.Add("Planning",3);
      STATE_PROJECT.Add("Execution", 4);
      STATE_PROJECT.Add("Post Go Live",5);
      STATE_PROJECT.Add("BAU",6);
      STATE_PROJECT.Add("Benefits Management", 7);
     
    }

    public List<ProjectDTO> GetAll(int enviroment)
    {
      try
      {

        Dictionary<string, object> dicParamters = new Dictionary<string, object>();
        dicParamters.Add("intEnviroment", enviroment);
        
        DataSet setResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInDataset("GetAllProject", dicParamters, _config.GetConnectionString("ProjectContextString"));
        DataSet setGeneral = SetTable(setResponse);


        DataTable tablaProject = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proyectos").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proyectos").Select(area => area).FirstOrDefault();
        DataTable tablaGoals = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Objetivos").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Objetivos").Select(area => area).FirstOrDefault();
        DataTable tablaProjectState = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapa").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapa").Select(area => area).FirstOrDefault();        
        DataTable tablaProjectRol = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoRol").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoRol").Select(area => area).FirstOrDefault();
        DataTable tablaProjectAreaAffected = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "AreaAfectadas").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "AreaAfectadas").Select(area => area).FirstOrDefault();



        List<ProjectDTO> listProject = tablaProject.Rows.Cast<DataRow>().Select(x => new ProjectDTO
        {
          IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
          GuidProyecto = x["GuidProyecto"].ToString(),
          Nombre = x["Nombre"] == null ? string.Empty : x["Nombre"].ToString(),
          Sponsor = x["Sponsor"] == null ? string.Empty : x["Sponsor"].ToString(),
          PresupuestoTotal = string.IsNullOrEmpty(x["Presupuesto_Total"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Total"]),
          PresupuestoFinancPlanificado = string.IsNullOrEmpty(x["Presupuesto_Financ_Planificado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Financ_Planificado"]),
          PresupuestoFinancEjecutado = string.IsNullOrEmpty(x["Presupuesto_Financ_Ejecutado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Financ_Ejecutado"]),
          PresupuestoFechaPlanificado = string.IsNullOrEmpty(x["Presupuesto_Fecha_Planificado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Fecha_Planificado"]),
          PrespuestoFechaEjecutado = string.IsNullOrEmpty(x["Prespuesto_Fecha_Ejecutado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Prespuesto_Fecha_Ejecutado"]),
          FtesAsignados = string.IsNullOrEmpty(x["FTEs_Asignados"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Asignados"]),
          Pm = string.IsNullOrEmpty(x["PM"].ToString()) ? string.Empty : x["PM"].ToString(),
          FtesEstimadoPm = string.IsNullOrEmpty(x["FTEs_Estimado_PM"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Estimado_PM"]),
          FtesRealPm = string.IsNullOrEmpty(x["FTEs_Real_PM"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Real_PM"]),
          TamanoProyecto = string.IsNullOrEmpty(x["Tamano_Proyecto"].ToString()) ? string.Empty : x["Tamano_Proyecto"].ToString(),
          EstadoProyecto = string.IsNullOrEmpty(x["Estado_Proyecto"].ToString()) ? null : x["Estado_Proyecto"].ToString(),
          SaludDescripcion = string.IsNullOrEmpty(x["Salud_Descripcion"].ToString()) ? string.Empty : x["Salud_Descripcion"].ToString(),
          SaludColor = string.IsNullOrEmpty(x["Salud_Color"].ToString()) ? string.Empty : x["Salud_Color"].ToString(),
          Comentarios = string.IsNullOrEmpty(x["Comentarios"].ToString()) ? string.Empty : x["Comentarios"].ToString(),
          UnidadArt = string.IsNullOrEmpty(x["Unidad_ART"].ToString()) ? false : (bool?)x["Unidad_ART"],
          UnidadSegArg = string.IsNullOrEmpty(x["Unidad_Seg_Arg"].ToString()) ? false : (bool?)x["Unidad_Seg_Arg"],
          UnidadSegUru = string.IsNullOrEmpty(x["Unidad_Seg_Uru"].ToString()) ? false : (bool?)x["Unidad_Seg_Uru"],
          UnidadRetiro = string.IsNullOrEmpty(x["Unidad_Retiro"].ToString()) ? false : (bool?)x["Unidad_Retiro"],
          UnidadCajaMutual = string.IsNullOrEmpty(x["Unidad_Caja_Mutual"].ToString()) ? false : (bool?)x["Unidad_Caja_Mutual"],
          UnidadServFinanciero = string.IsNullOrEmpty(x["Unidad_Serv_Financiero"].ToString()) ? false : (bool?)x["Unidad_Serv_Financiero"],
          UnidadTurismo = string.IsNullOrEmpty(x["Unidad_Turismo"].ToString()) ? false : (bool?)x["Unidad_Turismo"],
          UnidadAsoServ = string.IsNullOrEmpty(x["Unidad_Aso_Serv"].ToString()) ? false : (bool?)x["Unidad_Aso_Serv"],
          FechaDraf = string.IsNullOrEmpty(x["Fecha_Draf"].ToString()) ? null : (DateTime?)x["Fecha_Draf"],
          FechaPublicacion = string.IsNullOrEmpty(x["Fecha_Publicacion"].ToString()) ? null : (DateTime?)x["Fecha_Publicacion"],
          EstadoDashboard = string.IsNullOrEmpty(x["Estado_Dashboard"].ToString()) ? string.Empty : x["Estado_Dashboard"].ToString(),
          IdSemFecha = string.IsNullOrEmpty(x["ID_Sem_Fecha"].ToString()) ? null : (int?)x["ID_Sem_Fecha"],
          IdSemFinan = string.IsNullOrEmpty(x["ID_Sem_Finan"].ToString()) ? null : (int?)x["ID_Sem_Finan"],
          Npv = string.IsNullOrEmpty(x["Npv"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Npv"]),
          Irr = string.IsNullOrEmpty(x["Irr"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Irr"]),
          Payback = string.IsNullOrEmpty(x["Payback"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Payback"]),
          FechaUltimaModificacion = Convert.ToDateTime(x["Fecha_Ultima_Modificacion"]),
          HealthCheck = x["Healt_Check"].ToString(),
          CustomStateProject = tablaProjectState.Rows.Cast<DataRow>().Where(et => Convert.ToBoolean(et["Vigente"])
          && Convert.ToInt32(et["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])
          && (et["Nombre"].ToString() == "Backlog" || et["Nombre"].ToString() == "Stop")).Select(et => et["Nombre"].ToString()).FirstOrDefault(),
          Objetivos = tablaGoals.Rows.Cast<DataRow>().Where(ob => Convert.ToInt32(ob["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(ob => new ProjectGoalsDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdObjetivo = Convert.ToInt32(ob["ID_Objetivo"]),
            Descripcion = ob["Descripcion"].ToString()

          }).ToList(),
          ProyectoEtapas = tablaProjectState.Rows.Cast<DataRow>().Where(et => Convert.ToInt32(et["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(et => new ProjectStateDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdEtapa = Convert.ToInt32(et["ID_Etapa"]),
            FechaInicio = string.IsNullOrEmpty(et["Fecha_Inicio"].ToString()) ? null : (DateTime?)et["Fecha_Inicio"],
            FechaFin = string.IsNullOrEmpty(et["Fecha_Fin"].ToString()) ? null : (DateTime?)et["Fecha_Fin"],
            PorcentajeAvance = Convert.ToDecimal(et["Porcentaje_De_Avance"]),
            NombreEtapa = et["Nombre"].ToString(),
            Vigente = Convert.ToBoolean(et["Vigente"])

          }).ToList(),
          ProyectoRoles = tablaProjectRol.Rows.Cast<DataRow>().Where(rol => Convert.ToInt32(rol["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(rol => new ProjectRolesDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdProyectoRol = Convert.ToInt32(rol["ID_Proyecto_Rol"]),
            Nominado = rol["Nominado"].ToString(),
            Descripcion = rol["Descripcion"].ToString(),
            DetalleRol = rol["DetalleRol"].ToString()
          }).ToList(),
          ProyectoAreasAfetadas = tablaProjectAreaAffected.Rows.Cast<DataRow>().Where(area => Convert.ToInt32(area["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(area => new ProjectAreasAffectedDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdArea = Convert.ToInt32(area["ID_Area"]),
            Nombre = area["Nombre"].ToString()
          }).ToList(),

        }).ToList();

        return listProject;
      }
      catch (Exception ex)
      {
        throw (ex);
      }
    }

    public List<ProjectNameDTO> GetAllProjectName(int enviroment)
    {

      Dictionary<string, object> dicParamters = new Dictionary<string, object>();
      dicParamters.Add("intEnviroment", enviroment);
      dicParamters.Add("bitOnlyName", 1);

      DataSet tableResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInDataset("GetAllProject", dicParamters, _config.GetConnectionString("ProjectContextString"));

      DataSet setGeneral = SetTable(tableResponse);

      List<ProjectNameDTO> listProject = setGeneral.Tables.Cast<DataTable>().Where(x => x.Rows.Count > 0 && x.Rows[0]["NombreTabla"].ToString() == "Proyectos").Select(x => x).SingleOrDefault().Rows.Cast<DataRow>().Select(x => new ProjectNameDTO
      {
        IdProject = Convert.ToInt32(x["ID_Proyecto"]),
        Name = x["Nombre"] == null ? string.Empty : x["Nombre"].ToString()
      }).ToList();

      return listProject;
    }

    public List<ProjectStateDTO> GetAllProjectStatusById(int id)
    {
      try
      {
        
        Dictionary<string, object> dicParamters = new Dictionary<string, object>();
        dicParamters.Add("intIdProject", id);

        DataTable tableResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInTable("GetAllStateProjectById", dicParamters, _config.GetConnectionString("ProjectContextString"));
        List<ProjectStateDTO> listProjectStatus =  tableResponse.Rows.Cast<DataRow>().Select(x => new ProjectStateDTO
        {
          IdEtapa = Convert.ToInt32(x["idEtapa"]),
          NombreEtapa = x["Nombre"].ToString()
        }).ToList();

        return listProjectStatus;
      }
      catch (SqlException sqlEx)
      {
        throw sqlEx;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public ProjectDTO GetProjectById(int id)
    {

      ProjectDTO project = null;

      try
      {

        Dictionary<string, object> dicParamters = new Dictionary<string, object>();
        dicParamters.Add("intProjectID", id);

        DataSet setResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInDataset("GetProjectById", dicParamters, _config.GetConnectionString("ProjectContextString"));
        DataSet setGeneral = SetTable(setResponse);


        DataTable tablaProject = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proyectos").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proyectos").Select(area => area).FirstOrDefault();
        DataTable tablaGoals = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Objetivos").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Objetivos").Select(area => area).FirstOrDefault();
        DataTable tablaProjectState = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapa").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapa").Select(area => area).FirstOrDefault();
        DataTable tablaProjectStateDocument = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapaDocumento").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoEtapaDocumento").Select(area => area).FirstOrDefault();
        DataTable tablaRisks = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Risks").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Risks").Select(area => area).FirstOrDefault();
        DataTable tablaIssues = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Issues").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Issues").Select(area => area).FirstOrDefault();
        DataTable tablaProjectAreaAffected = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "AreaAfectadas").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "AreaAfectadas").Select(area => area).FirstOrDefault();
        DataTable tablaProjectProvider= setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proveedores").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Proveedores").Select(area => area).FirstOrDefault();
        DataTable tablaProjectRol = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoRol").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "ProyectoRol").Select(area => area).FirstOrDefault();
        DataTable tablaProjectTeam = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "EquipoPorProyecto").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "EquipoPorProyecto").Select(area => area).FirstOrDefault();
        DataTable tablaProjectActivities = setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Actividades").Select(area => area).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(area => area.Rows.Count > 0 && area.Rows[0]["NombreTabla"].ToString() == "Actividades").Select(area => area).FirstOrDefault();
        DataTable tablaProjectSema = setGeneral.Tables.Cast<DataTable>().Where(sem => sem.Rows.Count > 0 && sem.Rows[0]["NombreTabla"].ToString() == "Semaforos").Select(sem => sem).FirstOrDefault() == null ? new DataTable() : setGeneral.Tables.Cast<DataTable>().Where(sem => sem.Rows.Count > 0 && sem.Rows[0]["NombreTabla"].ToString() == "Semaforos").Select(sem => sem).FirstOrDefault();



        project = tablaProject.Rows.Cast<DataRow>().Select(x => new ProjectDTO
        {
          IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
          GuidProyecto = x["GuidProyecto"].ToString(),
          Nombre = x["Nombre"] == null ? string.Empty : x["Nombre"].ToString(),
          Sponsor = x["Sponsor"] == null ? string.Empty : x["Sponsor"].ToString(),
          PresupuestoTotal = string.IsNullOrEmpty(x["Presupuesto_Total"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Total"]),
          PresupuestoFinancPlanificado = string.IsNullOrEmpty(x["Presupuesto_Financ_Planificado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Financ_Planificado"]),
          PresupuestoFinancEjecutado = string.IsNullOrEmpty(x["Presupuesto_Financ_Ejecutado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Financ_Ejecutado"]),
          PresupuestoFechaPlanificado = string.IsNullOrEmpty(x["Presupuesto_Fecha_Planificado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Presupuesto_Fecha_Planificado"]),
          PrespuestoFechaEjecutado = string.IsNullOrEmpty(x["Prespuesto_Fecha_Ejecutado"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Prespuesto_Fecha_Ejecutado"]),
          FtesAsignados = string.IsNullOrEmpty(x["FTEs_Asignados"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Asignados"]),
          Pm = string.IsNullOrEmpty(x["PM"].ToString()) ? string.Empty : x["PM"].ToString(),
          FtesEstimadoPm = string.IsNullOrEmpty(x["FTEs_Estimado_PM"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Estimado_PM"]),
          FtesRealPm = string.IsNullOrEmpty(x["FTEs_Real_PM"].ToString()) ? null : (int?)Convert.ToDecimal(x["FTEs_Real_PM"]),
          TamanoProyecto = string.IsNullOrEmpty(x["Tamano_Proyecto"].ToString()) ? string.Empty : x["Tamano_Proyecto"].ToString(),
          EstadoProyecto = string.IsNullOrEmpty(x["Estado_Proyecto"].ToString()) ? null : x["Estado_Proyecto"].ToString(),
          SaludDescripcion = string.IsNullOrEmpty(x["Salud_Descripcion"].ToString()) ? string.Empty : x["Salud_Descripcion"].ToString(),
          SaludColor = string.IsNullOrEmpty(x["Salud_Color"].ToString()) ? string.Empty : x["Salud_Color"].ToString(),
          Comentarios = string.IsNullOrEmpty(x["Comentarios"].ToString()) ? string.Empty : x["Comentarios"].ToString(),
          UnidadArt = string.IsNullOrEmpty(x["Unidad_ART"].ToString()) ? false : (bool?)x["Unidad_ART"],
          UnidadSegArg = string.IsNullOrEmpty(x["Unidad_Seg_Arg"].ToString()) ? false : (bool?)x["Unidad_Seg_Arg"],
          UnidadSegUru = string.IsNullOrEmpty(x["Unidad_Seg_Uru"].ToString()) ? false : (bool?)x["Unidad_Seg_Uru"],
          UnidadRetiro = string.IsNullOrEmpty(x["Unidad_Retiro"].ToString()) ? false : (bool?)x["Unidad_Retiro"],
          UnidadCajaMutual = string.IsNullOrEmpty(x["Unidad_Caja_Mutual"].ToString()) ? false : (bool?)x["Unidad_Caja_Mutual"],
          UnidadServFinanciero = string.IsNullOrEmpty(x["Unidad_Serv_Financiero"].ToString()) ? false : (bool?)x["Unidad_Serv_Financiero"],
          UnidadTurismo = string.IsNullOrEmpty(x["Unidad_Turismo"].ToString()) ? false : (bool?)x["Unidad_Turismo"],
          UnidadAsoServ = string.IsNullOrEmpty(x["Unidad_Aso_Serv"].ToString()) ? false : (bool?)x["Unidad_Aso_Serv"],
          FechaDraf = string.IsNullOrEmpty(x["Fecha_Draf"].ToString()) ? null : (DateTime?)x["Fecha_Draf"],
          FechaPublicacion = string.IsNullOrEmpty(x["Fecha_Publicacion"].ToString()) ? null : (DateTime?)x["Fecha_Publicacion"],
          EstadoDashboard = string.IsNullOrEmpty(x["Estado_Dashboard"].ToString()) ? string.Empty : x["Estado_Dashboard"].ToString(),
          IdSemFecha = string.IsNullOrEmpty(x["ID_Sem_Fecha"].ToString()) ? null : (int?)x["ID_Sem_Fecha"],
          IdSemFinan = string.IsNullOrEmpty(x["ID_Sem_Finan"].ToString()) ? null : (int?)x["ID_Sem_Finan"],
          Npv = string.IsNullOrEmpty(x["Npv"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Npv"]),
          Irr = string.IsNullOrEmpty(x["Irr"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Irr"]),
          SeInformaTablero = true,
          Payback = string.IsNullOrEmpty(x["Payback"].ToString()) ? null : (decimal?)Convert.ToDecimal(x["Payback"]),
          FechaUltimaModificacion = string.IsNullOrEmpty(x["Fecha_Ultima_Modificacion"].ToString()) ? null : (DateTime?)x["Fecha_Ultima_Modificacion"],
          HealthCheck = x["Healt_Check"].ToString(),
          LinkPresupuestoFinanciero = x["Link_Presupuesto_Financiero"].ToString(),
          LinkPresupuestoFecha = x["Link_Presupuesto_Fecha"].ToString(),
          CustomStateProject = tablaProjectState.Rows.Cast<DataRow>().Where(et => Convert.ToBoolean(et["Vigente"])
          && Convert.ToInt32(et["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])
          && (et["Nombre"].ToString() == "Backlog" || et["Nombre"].ToString() == "Stop")).Select(et => et["Nombre"].ToString()).FirstOrDefault(),
          Objetivos = tablaGoals.Rows.Cast<DataRow>().Where(ob => Convert.ToInt32(ob["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(ob => new ProjectGoalsDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdObjetivo = Convert.ToInt32(ob["ID_Objetivo"]),
            Descripcion = ob["Descripcion"].ToString()

          }).ToList(),
          ProyectoEtapas = tablaProjectState.Rows.Cast<DataRow>().Where(et => Convert.ToInt32(et["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(et => new ProjectStateDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdEtapa = Convert.ToInt32(et["ID_Etapa"]),
            FechaInicio = string.IsNullOrEmpty(et["Fecha_Inicio"].ToString()) ? null : (DateTime?)et["Fecha_Inicio"],
            FechaFin = string.IsNullOrEmpty(et["Fecha_Fin"].ToString()) ? null : (DateTime?)et["Fecha_Fin"],
            PorcentajeAvance = string.IsNullOrEmpty(et["Porcentaje_De_Avance"].ToString()) ? 0 : Convert.ToDecimal(et["Porcentaje_De_Avance"]),
            NombreEtapa = et["Nombre"].ToString(),
            Observaciones = et["Observaciones"].ToString(),
            Vigente = Convert.ToBoolean(et["Vigente"])

          }).ToList(),
          ProyectoEtapaDocumentos = tablaProjectStateDocument.Rows.Cast<DataRow>().Where(etdoc => Convert.ToInt32(etdoc["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(etdoc => new ProjectStateDocumentDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdEtapa = Convert.ToInt32(etdoc["ID_Etapa"]),
            IdDocumento = string.IsNullOrEmpty(etdoc["ID_Documento"].ToString()) ? null : (int?)etdoc["ID_Documento"],
            IsFaltaDocumento = Convert.ToBoolean(etdoc["isFaltanDocumentos"]),
            NombreDocumento = etdoc["Nombre"].ToString(),
            Obligatorio = Convert.ToBoolean(etdoc["Obligatorio"]),
            UrlDocumento = etdoc["UrlDocumento"].ToString()
          }).ToList(),
          Riesgos = tablaRisks.Rows.Cast<DataRow>().Where(risk => Convert.ToInt32(risk["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(risk => new RisksDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdRisks = Convert.ToInt32(risk["ID_Riesgo"]),
            Descripcion = risk["Descripcion"].ToString()
          }).ToList(),
          Issues = tablaIssues.Rows.Cast<DataRow>().Where(issue => Convert.ToInt32(issue["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(issue => new IssuesDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdIssue = Convert.ToInt32(issue["ID_Issue"]),
            Descripcion = issue["Descripcion"].ToString()
          }).ToList(),
          ProyectoAreasAfetadas = tablaProjectAreaAffected.Rows.Cast<DataRow>().Where(area => Convert.ToInt32(area["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(area => new ProjectAreasAffectedDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdArea = Convert.ToInt32(area["ID_Area"]),
            Nombre = area["Nombre"].ToString()
          }).ToList(),
          ProyectoProveedor = tablaProjectProvider.Rows.Cast<DataRow>().Where(pro => Convert.ToInt32(pro["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(pro => new ProjectProviderDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdProveedor = Convert.ToInt32(pro["ID_Proveedor"]),
            Nombre = pro["Nombre"].ToString()
          }).ToList(),
          ProyectoRoles = tablaProjectRol.Rows.Cast<DataRow>().Where(rol => Convert.ToInt32(rol["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(rol => new ProjectRolesDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdProyectoRol = Convert.ToInt32(rol["ID_Proyecto_Rol"]),
            idRol = Convert.ToInt32(rol["ID_Rol"]),
            Nominado = rol["Nominado"].ToString(),
            Descripcion = rol["Descripcion"].ToString(),
            DetalleRol = rol["DetalleRol"].ToString()
          }).ToList(),
          EquiposPorProyecto = tablaProjectTeam.Rows.Cast<DataRow>().Where(team => Convert.ToInt32(team["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(team => new ProjectTeamDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdEquipoPorProyecto = Convert.ToInt32(team["ID_EquipoPorProyecto"]),
            Nombre = team["Nombre"].ToString(),
            Rol = team["Descripcion"].ToString(),
            IdRol = string.IsNullOrEmpty(team["IdRol"].ToString()) ? null : (int?)team["IdRol"]
          }).ToList(),
          Actividades = tablaProjectActivities.Rows.Cast<DataRow>().Where(act => Convert.ToInt32(act["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(act => new ProjectActivitiesDTO
          {
            IdProyecto = Convert.ToInt32(x["ID_Proyecto"]),
            IdActividad = Convert.ToInt32(act["ID_Actividad"]),
            Descripcion = act["Descripcion"].ToString(),
            Estado = act["Estado"].ToString(),
            Responsable = act["Responsable"].ToString()
          }).ToList(),
          Semaforos = tablaProjectSema.Rows.Cast<DataRow>().Where(sem => Convert.ToInt32(sem["ID_Proyecto"]) == Convert.ToInt32(x["ID_Proyecto"])).Select(sem => new ProjectLightDTO
          {
            IdProyecto = Convert.ToInt32(sem["ID_Proyecto"]),
            IdSemFecha = string.IsNullOrEmpty(sem["ID_Sem_Fecha"].ToString()) ? null : (int?)sem["ID_Sem_Fecha"],
            IdSemFinan = string.IsNullOrEmpty(sem["ID_Sem_Finan"].ToString()) ? null : (int?)sem["ID_Sem_Finan"],
            SemFechaColor = sem["SemFechaColor"].ToString(),
            SemFinColor = sem["SemFinColor"].ToString(),
            MinSemFecha  = string.IsNullOrEmpty(sem["MinSemFecha"].ToString()) ? null : (int?)sem["MinSemFecha"],
            MaxSemFecha = string.IsNullOrEmpty(sem["MaxSemFecha"].ToString()) ? null : (int?)sem["MaxSemFecha"],
            MinSemFinan = string.IsNullOrEmpty(sem["MinSemFinan"].ToString()) ? null : (int?)sem["MinSemFinan"],
            MaxSemFinan = string.IsNullOrEmpty(sem["MaxSemFinan"].ToString()) ? null : (int?)sem["MaxSemFinan"],
          }).ToList(),
        }).FirstOrDefault();

      }
      catch (Exception ex)
      {

        throw ex;
      }

      return project;
    }

    public bool InsertOrUpdateProject(Dictionary<string, object> dicProject)
    {
      try
      {
        string guidProject = dicProject["ProjectId"].ToString();

        Proyectos project = _ctx.Proyectos
          .Where(x => x.GuidProyecto == guidProject && x.FechaUltimaModificacion.Value.ToString("MM/dd/yyyy hh:mm:ss") == Convert.ToDateTime(dicProject["ProjectModifiedDate"]).ToString("MM/dd/yyyy hh:mm:ss"))
          .Select(x => x)
          .SingleOrDefault();

        if (project == null)
        {

          /*
           *Si es null es porque el proyecto
            tiene una fecha de modificacion menor a la de PWA , creo draft
          */

          project = new Proyectos();
          project.EstadoDashboard = "draft";
          project.EstadoProyecto = dicProject["EstadodelProyecto"] == null ? null : dicProject["EstadodelProyecto"].ToString();
          project.FechaDraf = DateTime.Now;
          project.FechaPublicacion = null;
          project.FtesAsignados = dicProject["FTE"] == null ? null : (int?)Convert.ToDecimal(dicProject["FTE"]);
          project.GuidProyecto = guidProject;
          project.Irr = dicProject["IRR"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["IRR"]);
          project.Nombre = dicProject["ProjectName"].ToString();
          project.Npv = dicProject["NPV"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["NPV"]);
          project.Payback = dicProject["Payback"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["Payback"]);
          project.Pm = dicProject["ProjectOwnerName"] == null ? null : dicProject["ProjectOwnerName"].ToString();
          project.SaludDescripcion = dicProject["SaluddelProyecto"] == null ? null : dicProject["SaluddelProyecto"].ToString();
          project.SaludColor = dicProject["SaluddelProyecto"] == null ? "#000000" : GetColorHealth(dicProject["SaluddelProyecto"].ToString());
          project.Sponsor = dicProject["ProjectSponsor"] == null ? null : dicProject["ProjectSponsor"].ToString();
          project.FechaUltimaModificacion = Convert.ToDateTime(dicProject["ProjectModifiedDate"]);
          project.PresupuestoTotal = dicProject["PresupuestoTotal"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["PresupuestoTotal"]);
          project.PresupuestoFinancPlanificado = dicProject["PresupuestoPlanificado"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["PresupuestoPlanificado"]);
          project.PresupuestoFinancEjecutado = dicProject["PresupuestoErogado"] == null ? null : (decimal?)Convert.ToDecimal(dicProject["PresupuestoErogado"]);
          project.Comentarios = dicProject["Conclusión"] == null ? null : dicProject["Conclusión"].ToString();
          project.FtesEstimadoPm = dicProject["FTEsEstimadoPM"] == null ? null : (int?)Convert.ToDecimal(dicProject["FTEsEstimadoPM"]);
          project.FtesRealPm = dicProject["FTEsRealPM"] == null ? null : (int?)Convert.ToDecimal(dicProject["FTEsRealPM"]);
          project.TamanoProyecto = dicProject["TamanoProyecto"] == null ? null : dicProject["TamanoProyecto"].ToString();
          
          List<string> objetivos = dicProject["Objetivos"] == null ? null : dicProject["Objetivos"].ToString().Split(".").ToList();

          if (objetivos != null)
          {
            project.Objetivos = objetivos.Where(x=> !string.IsNullOrEmpty(x)).Select(x => new Objetivos
            {
              Descripcion = x.Trim()
            }).ToList();
          }

          SetStateProject(ref project, dicProject);
          SetRisksProject(ref project, dicProject);
          SetIssuesProject(ref project, dicProject);
          SetTeamProject(ref project, dicProject);


          _ctx.Proyectos.Update(project);
          _ctx.SaveChanges();

          return true;

        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public bool InsertOrUpdateProject(List<Dictionary<string, object>> listDicProject)
    {

      try
      {
        DataTable tableProject = ToDataTable("Project", listDicProject);
        DataTable tableTask = ToDataTable("Task", listDicProject);
        DataTable tableRisk = ToDataTable("Risk", listDicProject);
        DataTable tableObjective = ToDataTable("Objective", listDicProject);
        DataTable tableIssues = ToDataTable("Issues", listDicProject);
        DataTable tableTeam = ToDataTable("Team", listDicProject);


        Dictionary<string, object> dicParamters = new Dictionary<string, object>();
        dicParamters.Add("tblProjects", tableProject);
        dicParamters.Add("tblTasks", tableTask);
        dicParamters.Add("tblRisks", tableRisk);
        dicParamters.Add("tblObjetivos", tableObjective);
        dicParamters.Add("tblIssues", tableIssues);
        dicParamters.Add("tblTeam", tableTeam);

        DataTable tableResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInTable("InsertDraftProjectPWA", dicParamters, _config.GetConnectionString("ProjectContextString"));
        return true;
      }
      catch (SqlException sqlEx)
      {
        throw sqlEx;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public bool PublishProject(List<string> listGuidProject)
    {
      try
      {
        Dictionary<string, object> dicParamters = new Dictionary<string, object>();
        dicParamters.Add("tblGuidProject", ConvertListToDataTable(listGuidProject));
        DataTable tableResponse = SqlDataBaseHelper.ExecuteStoreProcedureQueryInTable("PublishProjectPWA", dicParamters, _config.GetConnectionString("ProjectContextString"));
        if (!tableResponse.Columns.Contains("OK")) return false; 
        return true;
      }
      catch (SqlException sqlEx)
      {
        throw sqlEx;
      }
      catch (Exception ex)
      {
        throw ex;
      }      
    }
      
    private void SetStateProject(ref Proyectos project,Dictionary<string, object> dicProject)
    {
      try
      {
        if (dicProject.ContainsKey("Tasks"))
        {
          List<Dictionary<string, object>> listTaskProject = dicProject["Tasks"] as List<Dictionary<string, object>>;

          List<ProyectoEtapas> proyectoEtapas = listTaskProject.Where(x => this.STATE_PROJECT.ContainsKey(x["TaskName"].ToString())).Select(stateProject => new ProyectoEtapas
          {
            FechaInicio = Convert.ToDateTime(stateProject["TaskStartDate"]),
            FechaFin = Convert.ToDateTime(stateProject["TaskFinishDate"]),
            IdEtapa = this.STATE_PROJECT.Where(x => x.Key == stateProject["TaskName"].ToString()).Select(x => x.Value).SingleOrDefault(),
            PorcentajeDeAvance = Convert.ToDecimal(stateProject["TaskPercentCompleted"])
          }).ToList();

          Dictionary<string,object> dicTask = listTaskProject.Where(x => Convert.ToInt32(x["TaskIndex"]) == 0).Select(x=>x).SingleOrDefault();
          project.PresupuestoFechaPlanificado = dicTask["TaskCost"] == null ? null : (int?)Convert.ToDecimal(dicTask["TaskCost"]);
          project.PrespuestoFechaEjecutado = dicTask["TaskActualCost"] == null ? null : (int?)Convert.ToDecimal(dicTask["TaskActualCost"]);

          foreach (ProyectoEtapas pe in proyectoEtapas)
          {
            project.ProyectoEtapas.Add(pe);
          }

        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    private void SetRisksProject(ref Proyectos project, Dictionary<string, object> dicProject)
    {
      try
      {
        if (dicProject.ContainsKey("Risks"))
        {
          List<Dictionary<string, object>> listRisksProject = dicProject["Risks"] as List<Dictionary<string, object>>;

          List<Riesgos> listRisks = listRisksProject.Select(riskProject => new Riesgos
          {
            Descripcion = riskProject["Description"].ToString(),
          }).ToList();

          foreach (Riesgos risk in listRisks)
          {
            project.Riesgos.Add(risk);
          }

        }
      }
      catch (Exception ex)
      {
        throw ex;
      }

    }

    private void SetIssuesProject(ref Proyectos project, Dictionary<string, object> dicProject)
    {
      try
      {
        if (dicProject.ContainsKey("Issues"))
        {
          List<Dictionary<string, object>> listIssuesProject = dicProject["Issues"] as List<Dictionary<string, object>>;

          List<Issues> listIssues = listIssuesProject.Select(issuesProject => new Issues
          {            
            Descripcion = issuesProject["Title"].ToString()
          }).ToList();

          foreach (Issues issue in listIssues)
          {
            project.Issues.Add(issue);
          }

        }
      }
      catch (Exception ex)
      {
        throw ex;
      }

    }

    private void SetTeamProject(ref Proyectos project, Dictionary<string, object> dicProject)
    {
      try
      {
        if (dicProject.ContainsKey("Team"))
        {
          List<Dictionary<string, object>> listTeamProject = dicProject["Team"] as List<Dictionary<string, object>>;

          foreach (Dictionary<string, object> dicTeam in listTeamProject)
          {
            EquipoPorProyecto teamProject = new EquipoPorProyecto
            {
              Nombre = dicTeam["ResourceName"].ToString(),
              Rol = "Sin rol"
            };

            if (project.EquipoPorProyecto.Count > 0)
            {
              if (project.EquipoPorProyecto.Where(x => x.Nombre.Contains(teamProject.Nombre)).Count() <= 0) project.EquipoPorProyecto.Add(teamProject);
            }
            else
            {
              project.EquipoPorProyecto.Add(teamProject);
            }            
          }
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }

    }
    
    private DataTable ToDataTable(string tableName,List<Dictionary<string, object>> listProject)
    {
      DataTable result = new DataTable();
      if (listProject.Count == 0)
        return result;



      switch (tableName)
      {
        case "Project":

          #region Project
          result.Columns.Add("EstadoDelProyecto");
          result.Columns.Add("FechaDraf");
          result.Columns.Add("FechaPublicacion");
          result.Columns.Add("FtesAsignados");
          result.Columns.Add("GuidProyecto");
          result.Columns.Add("Irr");
          result.Columns.Add("Nombre");
          result.Columns.Add("Npv");
          result.Columns.Add("Payback");
          result.Columns.Add("Pm");
          result.Columns.Add("SaludDescripcion");
          result.Columns.Add("ColorSalud");
          result.Columns.Add("Sponsor");
          result.Columns.Add("FechaUltimaModificacion");
          result.Columns.Add("PresupuestoTotal");
          result.Columns.Add("PresupuestoFinancPlanificado");
          result.Columns.Add("PresupuestoFinancEjecutado");
          result.Columns.Add("PresupuestoFechaPlanificado");
          result.Columns.Add("PresupuestoFechaEjecutado");
          result.Columns.Add("Comentarios");
          result.Columns.Add("FtesEstimadoPm");
          result.Columns.Add("FtesRealPm");
          result.Columns.Add("TamanoProyecto");
          #endregion

          #region Fill Project

          try
          {
            (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
            {
              dt.Rows.Add(r["EstadodelProyecto"] == null ? null : r["EstadodelProyecto"].ToString()
                  , DateTime.Now
                  , null
                  , r["FTE"] == null ? null : (int?)Convert.ToDecimal(r["FTE"])
                  , r["ProjectId"].ToString()
                  , r["IRR"] == null ? null : (decimal?)Convert.ToDecimal(r["IRR"])
                  , r["ProjectName"].ToString()
                  , r["NPV"] == null ? null : (decimal?)Convert.ToDecimal(r["NPV"])
                  , r["Payback"] == null ? null : (decimal?)Convert.ToDecimal(r["Payback"])
                  , r["ProjectOwnerName"] == null ? null : r["ProjectOwnerName"].ToString()
                  , r["SaluddelProyecto"] == null ? null : r["SaluddelProyecto"].ToString()
                  , r["SaluddelProyecto"] == null ? "#000000" : GetColorHealth(r["SaluddelProyecto"].ToString())
                  , r["ProjectSponsor"] == null ? null : r["ProjectSponsor"].ToString()
                  , Convert.ToDateTime(r["ProjectModifiedDate"])
                  , r["PresupuestoTotal"] == null ? null : (decimal?)Convert.ToDecimal(r["PresupuestoTotal"])
                  , r["PresupuestoPlanificado"] == null ? null : (decimal?)Convert.ToDecimal(r["PresupuestoPlanificado"])
                  , r["PresupuestoErogado"] == null ? null : (decimal?)Convert.ToDecimal(r["PresupuestoErogado"])
                  , null
                  , null
                  , r["Conclusión"] == null ? null : r["Conclusión"].ToString()
                  , r["FTEsEstimadoPM"] == null ? null : (int?)Convert.ToDecimal(r["FTEsEstimadoPM"])
                  , r["FTEsRealPM"] == null ? null : (int?)Convert.ToDecimal(r["FTEsRealPM"])
                  , r["TamanoProyecto"] == null ? null : r["TamanoProyecto"].ToString()
                  );
              return dt;
            });
          }
          catch (Exception ex)
          {

            throw ex;
          }

         


          #endregion

          return result;

        case "Task":

          #region Task

          result.Columns.Add("FechaInicio");
          result.Columns.Add("FechaFin");
          result.Columns.Add("IdEtapa");
          result.Columns.Add("PorcentajeAvance");
          result.Columns.Add("GuidProyecto");

          #endregion

          #region Fill Task

          (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
          {
            if (r.ContainsKey("Tasks"))
            {
              List<Dictionary<string, object>> listTaskProject = r["Tasks"] as List<Dictionary<string, object>>;
              if (listTaskProject.Count > 0)
              {
                listTaskProject.Aggregate(dt, (table, task) =>
                {
                  if (this.STATE_PROJECT.Where(x => x.Key == task["TaskName"].ToString()).Select(x => x.Value).Count() > 0)
                  {
                    table.Rows.Add(Convert.ToDateTime(task["TaskStartDate"])
                      , Convert.ToDateTime(task["TaskFinishDate"])
                      , this.STATE_PROJECT.Where(x => x.Key == task["TaskName"].ToString()).Select(x => x.Value).SingleOrDefault()
                      , Convert.ToDecimal(task["TaskPercentCompleted"])
                      , r["ProjectId"].ToString());
                  }
                  return table;
                });
              }
            }
            return dt;
          });

          #endregion

          return result;

        case "Risk":

          #region Risk

          result.Columns.Add("Descripcion");
          result.Columns.Add("GuidProyecto");

          #endregion

          #region Fill Risk

          (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
          {
            if (r.ContainsKey("Risks"))
            {
              List<Dictionary<string, object>> listRiskProject = r["Risks"] as List<Dictionary<string, object>>;
              if (listRiskProject.Count > 0)
              {
                listRiskProject.Aggregate(dt, (table, risk) =>
                {
                  table.Rows.Add(risk["Description"]
                    , r["ProjectId"].ToString());
                  return table;
                });
              }
            }
            return dt;
          });

          #endregion

          return result;
        case "Objective":

          #region Objective
          result.Columns.Add("Descripcion");
          result.Columns.Add("GuidProyecto");
          #endregion

          #region Fill Objective

          (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
          {

            string objective = r["Objetivos"] as string;

            if (!string.IsNullOrEmpty(objective))
            {
              List<string> listObjective = objective.Split(".").ToList();

              if (listObjective.Count > 0)
              {
                objective.Split(".").ToList().Aggregate(dt, (table, obj) =>
                {
                  table.Rows.Add(obj
                    , r["ProjectId"].ToString());
                  return table;
                });
              }
            }
            return dt;

          });
          #endregion

          return result;
        case "Issues":

          #region Issues
          result.Columns.Add("Descripcion");
          result.Columns.Add("GuidProyecto");
          #endregion

          #region Fill Issues          

          (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
          {
            if (r.ContainsKey("Issues"))
            {
              List<Dictionary<string, object>> listRiskProject = r["Issues"] as List<Dictionary<string, object>>;
              if (listRiskProject.Count > 0)
              {
                listRiskProject.Aggregate(dt, (table, issue) =>
                {
                  table.Rows.Add(issue["Title"]
                    , r["ProjectId"].ToString());
                  return table;
                });
              }
            }

            return dt;
          });
           
          #endregion

          return result;
        case "Team":

          #region Team
          result.Columns.Add("Nombre");
          result.Columns.Add("Rol");
          result.Columns.Add("GuidProyecto");
          #endregion

          #region Fill Team

          (from dicProject in listProject select dicProject).Aggregate(result, (dt, r) =>
          {
            if (r.ContainsKey("Team"))
            {
              List<Dictionary<string, object>> listTeamProject = r["Team"] as List<Dictionary<string, object>>;
              if (listTeamProject.Count > 0)
              {
                listTeamProject.Aggregate(dt, (table, team) =>
                {
                  table.Rows.Add(team["ResourceName"], "Sin rol"
                    , r["ProjectId"].ToString());
                  return table;
                });
              }
            }
            return dt;

          });

          result = result.DefaultView.ToTable(true,"Nombre", "Rol", "GuidProyecto");

          #endregion

          return result;
        default:
          break;
      }

      return result;
    }

    private string GetColorHealth(string healtColor)
    {
      switch (healtColor)
      {
        case "Buena Salud":
          return "#28a745";
        case "Buena":
          return "#28a745";
        case "Con problemas":
          return "#ffc107";
        case "Critico":
          return "#dc3545";
        default:
          return "#000000";
      }
    }

    private DataTable ConvertListToDataTable(List<string> lista)
    {
      DataTable tblCommon = new DataTable();
      tblCommon.Columns.Add(new DataColumn("GuidProject"));
      
      if (lista != null)
      {
        (from i in lista select i).Aggregate(tblCommon, (dt, r) => { dt.Rows.Add(r); return dt; });
      }
      return tblCommon;
    }

    private DataSet SetTable(DataSet setResponse)
    {
      try
      {

        DataSet setGeneral = new DataSet();

        foreach (DataTable tablaName in setResponse.Tables)
        {

          DataTable tableClone = setResponse.Tables[tablaName.TableName].Clone();
          tableClone = setResponse.Tables[tablaName.TableName].Copy();
          setGeneral.Tables.Add(tableClone);
        }

        return setGeneral;
      }
      catch (Exception ex)
      {

        throw ex;
      }
    }

    public int Add()
    {
      var newProject = new ProjectDTO();
      newProject.Nombre = "Nuevo proyecto "+ DateTime.Now.ToShortDateString();
      newProject.GuidProyecto = Guid.NewGuid().ToString();
      newProject.FechaDraf = DateTime.Now;
      newProject.FechaUltimaModificacion = DateTime.Now;
      newProject.EstadoDashboard = "draft";
      newProject.SeInformaTablero = true;

      var entity = _mapper.Map<Proyectos>(newProject);

      List<ProyectoEtapas> listProjectState = new List<ProyectoEtapas>();


      _ctx.Entry(entity).State = EntityState.Added;
      _ctx.Set<Proyectos>().Add(entity);

      foreach (var state in STATE_PROJECT.Keys)
      {
        ProyectoEtapas proyectState = new ProyectoEtapas();
        proyectState.IdEtapa = STATE_PROJECT[state];
        proyectState.IdProyecto = entity.IdProyecto;
        proyectState.PorcentajeDeAvance = 0;
        listProjectState.Add(proyectState);
      }
      _ctx.Set<ProyectoEtapas>().AddRange(listProjectState);
      //_ctx.Set<Actividades>().AddRange(entity.Actividades);
      //_ctx.Set<Issues>().AddRange(entity.Issues);
      //_ctx.Set<Objetivos>().AddRange(entity.Objetivos);
      //_ctx.Set<ProyectoAreasAfetadas>().AddRange(entity.ProyectoAreasAfetadas);
      //_ctx.Set<ProyectoProveedor>().AddRange(entity.ProyectoProveedor);
      //_ctx.Set<ProyectoRoles>().AddRange(entity.ProyectoRoles);
      //_ctx.Set<Riesgos>().AddRange(entity.Riesgos);
      //_ctx.Set<EquipoPorProyecto>().AddRange(entity.EquipoPorProyecto);
      //_ctx.Set<ProyectoEtapaDocumento>().AddRange(docs);

      _ctx.SaveChanges();
      return entity.IdProyecto;
    }

    public bool DeleteProject(int id)
    {
      try
      {
        var project = _ctx.Proyectos.Where(x => x.IdProyecto == id).FirstOrDefault();
        if (project != null)
        {
          _ctx.Remove(project);
          _ctx.SaveChanges();
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
        throw;
      }
    }

    public bool Update(ProjectDTO project)
    {
      project.SaludColor = GetColorHealth(project.SaludDescripcion);
      project.FechaDraf = DateTime.Now;
      project.FechaUltimaModificacion = DateTime.Now;
      project = ProccesCustomState(project);


      var entity = _mapper.Map<Proyectos>(project);     

      var deletedObjetivos = _ctx.Objetivos.Where(x => x.IdProyecto == project.IdProyecto && !(project.Objetivos.Select(y => y.IdObjetivo).Contains(x.IdObjetivo))).ToList();
      var updatedObjetivos = entity.Objetivos.Where(x => x.IdObjetivo != 0).ToList();
      var addedObjetivos = entity.Objetivos.Where(x => x.IdObjetivo == 0).ToList();

      var deletedRisks = _ctx.Riesgos.Where(x => x.IdProyecto == project.IdProyecto && !(project.Riesgos.Select(y => y.IdRisks).Contains(x.IdRiesgo))).ToList();
      var updatedRisks = entity.Riesgos.Where(x => x.IdRiesgo != 0).ToList();
      var addedRisks = entity.Riesgos.Where(x => x.IdRiesgo == 0).ToList();

      var deletedIssues = _ctx.Issues.Where(x => x.IdProyecto == project.IdProyecto && !(project.Issues.Select(y => y.IdIssue).Contains(x.IdIssue))).ToList();
      var updatedIssues = entity.Issues.Where(x => x.IdIssue != 0).ToList();
      var addedIssues = entity.Issues.Where(x => x.IdIssue == 0).ToList();

      var deletedActividades = _ctx.Actividades.Where(x => x.IdProyecto == project.IdProyecto && !(project.Actividades.Select(y => y.IdActividad).Contains(x.IdActividad))).ToList();
      var updatedActividades = entity.Actividades.Where(x => x.IdActividad != 0).ToList();
      var addedActividades = entity.Actividades.Where(x => x.IdActividad == 0).ToList();

      var deletedProveedores = _ctx.ProyectoProveedor.Where(x => x.IdProyecto == project.IdProyecto && !(project.ProyectoProveedor.Select(y => y.IdProveedor).Contains(x.IdProveedor))).ToList();
      var actualProveedores = _ctx.ProyectoProveedor.Where(x => x.IdProyecto == project.IdProyecto).ToList();
      var addedProveedores = entity.ProyectoProveedor.Where(x => !actualProveedores.Select(y => y.IdProveedor).Contains(x.IdProveedor)).ToList();

      var deletedAreasAfectadas = _ctx.ProyectoAreasAfetadas.Where(x => x.IdProyecto == project.IdProyecto && !(project.ProyectoAreasAfetadas.Select(y => y.IdArea).Contains(x.IdArea))).ToList();
      var actualAreasAfectadas = _ctx.ProyectoAreasAfetadas.Where(x => x.IdProyecto == project.IdProyecto).ToList();
      var addedAreasAfectadas = entity.ProyectoAreasAfetadas.Where(x => !actualAreasAfectadas.Select(y => y.IdArea).Contains(x.IdArea)).ToList();

      var deletedEquipos = _ctx.EquipoPorProyecto.Where(x => x.IdProyecto == project.IdProyecto && !(project.EquiposPorProyecto.Select(y => y.IdEquipoPorProyecto).Contains(x.IdEquipoPorProyecto))).ToList();
      var updatedEquipos = entity.EquipoPorProyecto.Where(x => x.IdEquipoPorProyecto != 0).ToList();
      var addedEquipos = entity.EquipoPorProyecto.Where(x => x.IdEquipoPorProyecto == 0).ToList();

      var deletedRol = _ctx.ProyectoRoles.Where(x => x.IdProyecto == project.IdProyecto && !(project.ProyectoRoles.Select(y => y.IdProyectoRol).Contains(x.IdProyectoRol))).ToList();
      var updatedRol = entity.ProyectoRoles.Where(x => x.IdProyectoRol != 0).ToList();
      var addedRol = entity.ProyectoRoles.Where(x => x.IdProyectoRol == 0).ToList();

      _ctx.Entry(entity).State = EntityState.Modified;
      _ctx.Set<Proyectos>().Update(entity);
      _ctx.Set<ProyectoEtapas>().UpdateRange(entity.ProyectoEtapas);

      _ctx.Set<Objetivos>().UpdateRange(updatedObjetivos);
      _ctx.Set<Objetivos>().AddRange(addedObjetivos);
      _ctx.Set<Objetivos>().RemoveRange(deletedObjetivos);

      _ctx.Set<Riesgos>().UpdateRange(updatedRisks);
      _ctx.Set<Riesgos>().AddRange(addedRisks);
      _ctx.Set<Riesgos>().RemoveRange(deletedRisks);

      _ctx.Set<Issues>().UpdateRange(updatedIssues);
      _ctx.Set<Issues>().AddRange(addedIssues);
      _ctx.Set<Issues>().RemoveRange(deletedIssues);

      _ctx.Set<Actividades>().UpdateRange(updatedActividades);
      _ctx.Set<Actividades>().AddRange(addedActividades);
      _ctx.Set<Actividades>().RemoveRange(deletedActividades);

      _ctx.Set<ProyectoProveedor>().AddRange(addedProveedores);
      _ctx.Set<ProyectoProveedor>().RemoveRange(deletedProveedores);

      _ctx.Set<ProyectoAreasAfetadas>().AddRange(addedAreasAfectadas);
      _ctx.Set<ProyectoAreasAfetadas>().RemoveRange(deletedAreasAfectadas);

      _ctx.Set<EquipoPorProyecto>().UpdateRange(updatedEquipos);
      _ctx.Set<EquipoPorProyecto>().AddRange(addedEquipos);
      _ctx.Set<EquipoPorProyecto>().RemoveRange(deletedEquipos);

      _ctx.Set<ProyectoRoles>().UpdateRange(updatedRol);
      _ctx.Set<ProyectoRoles>().AddRange(addedRol);
      _ctx.Set<ProyectoRoles>().RemoveRange(deletedRol);

      var docsToAdd = project.ProyectoEtapaDocumentos.Where(x => x.IdDocumento == null && !string.IsNullOrEmpty(x.UrlDocumento)).ToList();

      foreach (var doc in docsToAdd)
      {
        doc.IdDocumento = _ctx.Documentos.Where(x => x.Nombre == doc.NombreDocumento && doc.IdEtapa == x.IdEtapa).Select(x => x.IdDocumento).FirstOrDefault();
      }

      var docs = _mapper.Map<IList<ProyectoEtapaDocumento>>(project.ProyectoEtapaDocumentos);
      var docsToAddMapped = _mapper.Map<IList<ProyectoEtapaDocumento>>(docsToAdd);

      _ctx.Set<ProyectoEtapaDocumento>().AddRange(docsToAddMapped);
      _ctx.Set<ProyectoEtapaDocumento>().RemoveRange(docs.Where(x => x.IdDocumento != 0 && string.IsNullOrEmpty(x.UrlDocumento)));

      _ctx.SaveChanges();
      return true;
    }

    private ProjectDTO ProccesCustomState(ProjectDTO project)
    {

      project.ProyectoEtapas.Where(state => state.NombreEtapa.Trim().ToLower() == "backlog").ToList().ForEach(x =>
      {
        x.Vigente = false;
      });

      project.ProyectoEtapas.Where(state => state.NombreEtapa.Trim().ToLower() == "stop").ToList().ForEach(x =>
      {
        x.Vigente = false;
      });

      if (!string.IsNullOrEmpty(project.CustomStateProject))
      {
        project.ProyectoEtapas.Where(state => state.NombreEtapa.Trim().ToLower() == project.CustomStateProject.ToLower()).Select(x => x).SingleOrDefault(x => x.Vigente = true);        

        if (project.ProyectoEtapas.Where(state => state.NombreEtapa.Trim().ToLower() == project.CustomStateProject.ToLower()).Select(x => x).SingleOrDefault() == null)
        {
          ProjectStateDTO projectState = new ProjectStateDTO();
          projectState.FechaInicio = null;
          projectState.FechaFin = null;
          projectState.Vigente = true;
          projectState.IdEtapa = _ctx.Etapas.Where(x => x.Nombre.ToLower() == project.CustomStateProject.ToLower()).Select(x => x.IdEtapa).SingleOrDefault();
          project.ProyectoEtapas.Add(projectState);
        }
      }

      return project;
    }
  }
}

