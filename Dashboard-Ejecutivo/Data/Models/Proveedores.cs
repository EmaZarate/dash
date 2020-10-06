using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Proveedores
    {
        public Proveedores()
        {
            ProyectoProveedor = new HashSet<ProyectoProveedor>();
        }

        public int IdProveedor { get; set; }
        public string Nombre { get; set; }

        public ICollection<ProyectoProveedor> ProyectoProveedor { get; set; }
    }
}
