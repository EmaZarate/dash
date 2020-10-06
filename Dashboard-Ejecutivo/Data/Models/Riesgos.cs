using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Riesgos
    {
        public int IdRiesgo { get; set; }
        public string Descripcion { get; set; }
        public int? IdProyecto { get; set; }

        public Proyectos IdProyectoNavigation { get; set; }
    }
}
