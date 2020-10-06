using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Models.Interfaces
{
  public interface IExternalAuthSettings
  {
    string AppId { get; set; }
    string AppSecret { get; set; }
    string RedirectUri { get; set; }
  }
}
