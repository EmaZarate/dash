using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Documentos
    {
        public Documentos()
        {
            ProyectoEtapaDocumento = new HashSet<ProyectoEtapaDocumento>();
        }

        public int IdDocumento { get; set; }
        public string Nombre { get; set; }
        public int? IdEtapa { get; set; }
        public bool Obligatorio { get; set; }

        public Etapas IdEtapaNavigation { get; set; }
        public ICollection<ProyectoEtapaDocumento> ProyectoEtapaDocumento { get; set; }
    }
}
