using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
  public class ProviderDTO
  {
    public int IdProveedor { get; set; }
    public string Nombre { get; set; }

    public ICollection<ProjectProviderDTO> ProyectoProveedor { get; set; }
  }
}
