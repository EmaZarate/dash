using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class RolesEquipo
    {
        public RolesEquipo()
        {
            EquipoPorProyecto = new HashSet<EquipoPorProyecto>();
        }

        public int IdRol { get; set; }
        public string Descripcion { get; set; }

        public ICollection<EquipoPorProyecto> EquipoPorProyecto { get; set; }
    }
}
