using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class SemaforoPresupFinanciero
    {
        public SemaforoPresupFinanciero()
        {
            Proyectos = new HashSet<Proyectos>();
        }

        public int IdSemFinan { get; set; }
        public string Color { get; set; }
        public int? Minimo { get; set; }
        public int? Maximo { get; set; }

        public ICollection<Proyectos> Proyectos { get; set; }
    }
}
