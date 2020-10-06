using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class AreasAfectadas
    {
        public AreasAfectadas()
        {
            ProyectoAreasAfetadas = new HashSet<ProyectoAreasAfetadas>();
        }

        public int IdAreasAfectadas { get; set; }
        public string Nombre { get; set; }

        public ICollection<ProyectoAreasAfetadas> ProyectoAreasAfetadas { get; set; }
    }
}
