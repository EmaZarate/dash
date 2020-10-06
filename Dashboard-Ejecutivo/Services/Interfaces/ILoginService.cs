using Dashboard_Ejecutivo.DataDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Interfaces
{
  public interface ILoginService
  {
    Task<string> LoginUser(CredentialsDTO credentials);
  }
}
