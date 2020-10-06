using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface IRolService
  {
    List<RolesDTO> GetAll();
    bool Delete(int id);
    int Add(RolesDTO addProvider);
    int Update(RolesDTO updateProvider);
    RolesDTO GetOne(int id);
  }
}
