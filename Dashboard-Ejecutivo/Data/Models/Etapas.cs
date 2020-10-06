using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Etapas
    {
        public Etapas()
        {
            Documentos = new HashSet<Documentos>();
            ProyectoEtapas = new HashSet<ProyectoEtapas>();
        }

        public int IdEtapa { get; set; }
        public string Nombre { get; set; }

        public ICollection<Documentos> Documentos { get; set; }
        public ICollection<ProyectoEtapas> ProyectoEtapas { get; set; }
    }
}
