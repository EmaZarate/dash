using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Objetivos
    {
        public int IdObjetivo { get; set; }
        public string Descripcion { get; set; }
        public int? IdProyecto { get; set; }

        public Proyectos IdProyectoNavigation { get; set; }
    }
}
