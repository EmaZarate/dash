using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharepointPWA
{
    public partial class Proyecto
    {
        public Proyecto()
        {

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
        public string TamañoProyecto { get; set; }
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

    }
}
