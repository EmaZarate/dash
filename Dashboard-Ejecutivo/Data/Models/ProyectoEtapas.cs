using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class ProyectoEtapas
    {
        public ProyectoEtapas()
        {
            ProyectoEtapaDocumento = new HashSet<ProyectoEtapaDocumento>();
        }

        public int IdProyecto { get; set; }
        public int IdEtapa { get; set; }
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public decimal? PorcentajeDeAvance { get; set; }
        public string Observaciones { get; set; }
        public bool Vigente { get; set; }
        public Etapas IdEtapaNavigation { get; set; }
        public Proyectos IdProyectoNavigation { get; set; }
        public ICollection<ProyectoEtapaDocumento> ProyectoEtapaDocumento { get; set; }
    }
}

