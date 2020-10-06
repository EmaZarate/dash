using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dashboard_Ejecutivo.Models.Interfaces;

namespace Dashboard_Ejecutivo.Models
{
    public class MicrosoftGraphAuthSetting
{
    public class MicrosoftGraphAuthSettings : IExternalAuthSettings
    {
      public string AppId { get; set; }
      public string AppSecret { get; set; }
      public string RedirectUri { get; set; }
    }
  }
}
