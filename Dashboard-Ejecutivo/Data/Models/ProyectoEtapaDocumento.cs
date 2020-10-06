using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class ProyectoEtapaDocumento
    {
        public int IdProyecto { get; set; }
        public int IdEtapa { get; set; }
        public int IdDocumento { get; set; }
        public string UrlDocumento { get; set; }

        public ProyectoEtapas Id { get; set; }
        public Documentos IdDocumentoNavigation { get; set; }
    }
}
