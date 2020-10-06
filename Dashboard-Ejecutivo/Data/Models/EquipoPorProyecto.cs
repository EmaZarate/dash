using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class EquipoPorProyecto
    {
      public int IdEquipoPorProyecto { get; set; }
      public int IdProyecto { get; set; }
      public string Nombre { get; set; }
      public string Rol { get; set; }
      public int? IdRol { get; set; }

      public Proyectos IdProyectoNavigation { get; set; }
      public RolesEquipo IdRolNavigation { get; set; }
  }
}
