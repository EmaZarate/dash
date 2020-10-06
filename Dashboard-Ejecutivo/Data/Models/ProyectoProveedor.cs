using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class ProyectoProveedor
    {
        public int IdProyecto { get; set; }
        public int IdProveedor { get; set; }

        public Proveedores IdProveedorNavigation { get; set; }
        public Proyectos IdProyectoNavigation { get; set; }
    }
}
