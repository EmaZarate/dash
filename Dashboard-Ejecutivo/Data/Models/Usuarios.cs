using System;
using System.Collections.Generic;

namespace Dashboard_Ejecutivo.Data.Models
{
    public partial class Usuarios
    {
        public string CodUsuario { get; set; }
        public string Descripcion { get; set; }
        public int? IdPerfilUsuario { get; set; }

        public PerfilesUsuarios IdPerfilUsuarioNavigation { get; set; }
    }
}
