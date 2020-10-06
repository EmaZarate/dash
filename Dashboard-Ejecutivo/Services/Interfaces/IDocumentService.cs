using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface IDocumentService
  {
    List<DocumentDTO> GetAll();
    bool Delete(int id);
    int Add(DocumentDTO addProvider);
    int Update(DocumentDTO updateProvider);
    DocumentDTO GetOne(int id);
  }
}
