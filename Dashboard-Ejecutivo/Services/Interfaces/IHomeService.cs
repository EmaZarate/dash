using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface IHomeService
  {
    List<Dictionary<string,object>> GetAllProjectsPWA();

    Dictionary<string, object> GetProjectByIdPWA(string id);

    List<RolesDTO> GetRoles();

    List<ProveedoresDTO> GetProveedores();

    List<AreasAfectadasDTO> GetAreas();

    List<ProjectStateDTO> GetStates();
  }
}
