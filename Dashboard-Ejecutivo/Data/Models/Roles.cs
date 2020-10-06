using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Roles
    {
        public Roles()
        {
            ProyectoRoles = new HashSet<ProyectoRoles>();
        }

        public int IdRol { get; set; }
        public string Descripcion { get; set; }
        public string DetalleRol { get; set; }
        public ICollection<ProyectoRoles> ProyectoRoles { get; set; }
    }
}
