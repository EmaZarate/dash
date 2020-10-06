using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface IProviderService
  {
    List<ProveedoresDTO> GetAll();
    bool Delete(int id);
    int Add(ProviderDTO addProvider);
    int Update(ProviderDTO updateProvider);
    ProveedoresDTO GetOne(int id);    
  }
}
