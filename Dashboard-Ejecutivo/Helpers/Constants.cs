using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Helpers
{
  public class Constants
  {
    public static class Strings
    {
      public static class JwtClaimIdentifiers
      {
        public const string Rol = "rol", Id = "id", Name = "name";
      }

      public static class JwtClaims
      {
        public const string ApiAccess = "api_access";
        public const string Administrador = "admin";
        public const string Usuario = "user";
      }
    }
  }
}
