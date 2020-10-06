using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
  public class DocumentDTO
  {
    public DocumentDTO()
    {
      ProyectoEtapaDocumento = new HashSet<ProjectStateDocumentDTO>();
    }

    public int IdDocumento { get; set; }
    public string Nombre { get; set; }
    public int? IdEtapa { get; set; }
    public bool Obligatorio { get; set; }
    public string NombreEtapa { get; set; }
    public ProjectStateDTO ProyectoEtapas { get; set; }
    public ICollection<ProjectStateDocumentDTO> ProyectoEtapaDocumento { get; set; }
  }
}
