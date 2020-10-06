using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
    public class ProjectStateDocumentDTO
    {
      public ProjectStateDocumentDTO()
      {

      }

      public int IdProyecto { get; set; }
      public int IdEtapa { get; set; }
      public int? IdDocumento { get; set; }
      public bool IsFaltaDocumento { get; set; }
      public string NombreDocumento { get; set; }
      public string UrlDocumento { get; set; }
      public bool Obligatorio { get; set; }




  }
}
