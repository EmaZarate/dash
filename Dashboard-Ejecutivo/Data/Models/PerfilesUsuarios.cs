using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class PerfilesUsuarios
    {
        public PerfilesUsuarios()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int IdPerfilUsuario { get; set; }
        public string Descripcion { get; set; }

        public ICollection<Usuarios> Usuarios { get; set; }
    }
}
