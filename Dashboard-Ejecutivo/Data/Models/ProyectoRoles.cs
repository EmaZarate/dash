using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class ProyectoRoles
    {
        public int IdProyectoRol { get; set; }
        public int? IdProyecto { get; set; }
        public int? IdRol { get; set; }
        public string Nominado { get; set; }

        public Proyectos IdProyectoNavigation { get; set; }
        public Roles IdRolNavigation { get; set; }
    }
}
