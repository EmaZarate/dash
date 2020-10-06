using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
  public class ProjectStateDTO
  {
    public ProjectStateDTO()
    {

    }

    public int IdProyecto { get; set; }
    public int IdEtapa { get; set; }
    public decimal PorcentajeAvance { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public string NombreEtapa { get; set; }
    public string Observaciones { get; set; }
    public bool Vigente { get; set; }

  }
}
