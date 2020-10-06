using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Actividades
    {
        public int IdActividad { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public string Responsable { get; set; }
        public int? IdProyecto { get; set; }

        public Proyectos IdProyectoNavigation { get; set; }
    }
}
