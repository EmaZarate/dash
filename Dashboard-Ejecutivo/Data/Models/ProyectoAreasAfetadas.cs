using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class ProyectoAreasAfetadas
    {
        public int IdProyecto { get; set; }
        public int IdArea { get; set; }

        public AreasAfectadas IdAreaNavigation { get; set; }
        public Proyectos IdProyectoNavigation { get; set; }
    }
}
