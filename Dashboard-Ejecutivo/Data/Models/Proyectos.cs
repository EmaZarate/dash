using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Proyectos
    {
        public Proyectos()
        {
            Actividades = new HashSet<Actividades>();
            EquipoPorProyecto = new HashSet<EquipoPorProyecto>();
            Issues = new HashSet<Issues>();
            Objetivos = new HashSet<Objetivos>();
            ProyectoAreasAfetadas = new HashSet<ProyectoAreasAfetadas>();
            ProyectoEtapas = new HashSet<ProyectoEtapas>();
            ProyectoProveedor = new HashSet<ProyectoProveedor>();
            ProyectoRoles = new HashSet<ProyectoRoles>();
            Riesgos = new HashSet<Riesgos>();
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
        public DateTime? FechaPublicacion { get; set; }
        public string EstadoDashboard { get; set; }
        public int? IdSemFecha { get; set; }
        public int? IdSemFinan { get; set; }
        public decimal? Npv { get; set; }
        public decimal? Irr { get; set; }
        public decimal? Payback { get; set; }
        public bool SeInformaTablero { get; set; }
        public string HealthCheck { get; set; }
        public string LinkPresupuestoFinanciero { get; set; }
        public string LinkPresupuestoFecha { get; set; }    
        public DateTime? FechaUltimaModificacion { get; set; }
        public SemaforoPresupFecha IdSemFechaNavigation { get; set; }
        public SemaforoPresupFinanciero IdSemFinanNavigation { get; set; }
        public ICollection<Actividades> Actividades { get; set; }
        public ICollection<EquipoPorProyecto> EquipoPorProyecto { get; set; }
        public ICollection<Issues> Issues { get; set; }
        public ICollection<Objetivos> Objetivos { get; set; }
        public ICollection<ProyectoAreasAfetadas> ProyectoAreasAfetadas { get; set; }
        public ICollection<ProyectoEtapas> ProyectoEtapas { get; set; }
        public ICollection<ProyectoProveedor> ProyectoProveedor { get; set; }
        public ICollection<ProyectoRoles> ProyectoRoles { get; set; }
        public ICollection<Riesgos> Riesgos { get; set; }
    }
}
