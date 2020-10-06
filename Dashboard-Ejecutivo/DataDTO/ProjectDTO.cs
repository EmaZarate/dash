using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
  public class ProjectDTO
  {

    public ProjectDTO()
    {
      Objetivos = new List<ProjectGoalsDTO>();
      ProyectoEtapas = new List<ProjectStateDTO>();
      ProyectoEtapaDocumentos = new List<ProjectStateDocumentDTO>();
      Actividades = new List<ProjectActivitiesDTO>();
      Issues = new List<IssuesDTO>();
      ProyectoAreasAfetadas = new List<ProjectAreasAffectedDTO>();
      ProyectoProveedor = new List<ProjectProviderDTO>();
      ProyectoRoles = new List<ProjectRolesDTO>();
      Riesgos = new List<RisksDTO>();
      EquiposPorProyecto = new List<ProjectTeamDTO>();
      Semaforos = new List<ProjectLightDTO>();
    }

    public int IdProyecto { get; set; }
    public string GuidProyecto { get; set; }
    public string Nombre { get; set; }
    public string Sponsor { get; set; }
    public decimal? PresupuestoTotal { get; set; }
    public decimal? PresupuestoFinancPlanificado { get; set; }
    public decimal? PresupuestoFinancEjecutado { get; set; }
    public decimal? PresupuestoFechaPlanificado { get; set; }
    public decimal? PrespuestoFechaEjecutado { get; set; }
    public int? FtesAsignados { get; set; }
    public string Pm { get; set; }
    public int? FtesEstimadoPm { get; set; }
    public int? FtesRealPm { get; set; }
    public string TamanoProyecto { get; set; }
    public string EstadoProyecto { get; set; }
    public string SaludDescripcion { get; set; }
    public string SaludColor { get; set; }
    public string Comentarios { get; set; }
    public bool? UnidadArt { get; set; }
    public bool? UnidadSegArg { get; set; }
    public bool? UnidadSegUru { get; set; }
    public bool? UnidadRetiro { get; set; }
    public bool? UnidadCajaMutual { get; set; }
    public bool? UnidadServFinanciero { get; set; }
    public bool? UnidadTurismo { get; set; }
    public bool? UnidadAsoServ { get; set; }
    public DateTime? FechaDraf { get; set; }
    public DateTime? FechaUltimaModificacion { get; set; }
    public DateTime? FechaPublicacion { get; set; }
    public string EstadoDashboard { get; set; }
    public int? IdSemFecha { get; set; }
    public int? IdSemFinan { get; set; }
    public decimal? Npv { get; set; }
    public decimal? Irr { get; set; }
    public decimal? Payback { get; set; }
    public string HealthCheck { get; set; }
    public string LinkPresupuestoFinanciero { get; set; }
    public string LinkPresupuestoFecha { get; set; }
    public string CustomStateProject { get; set; }
    public bool SeInformaTablero { get; set; }    
    public IList<ProjectGoalsDTO> Objetivos { get; set; }
    public IList<ProjectStateDTO> ProyectoEtapas { get; set; }
    public IList<ProjectStateDocumentDTO> ProyectoEtapaDocumentos { get; set; }
    public IList<ProjectActivitiesDTO> Actividades { get; set; }
    public IList<IssuesDTO> Issues { get; set; }
    public IList<ProjectAreasAffectedDTO> ProyectoAreasAfetadas { get; set; }
    public IList<ProjectProviderDTO> ProyectoProveedor { get; set; }
    public IList<ProjectRolesDTO> ProyectoRoles { get; set; }
    public IList<RisksDTO> Riesgos { get; set; }
    public IList<ProjectTeamDTO> EquiposPorProyecto { get; set; }
    public IList<ProjectLightDTO> Semaforos { get; set; }
  }
}

