using Dashboard_Ejecutivo.Auth;
using Dashboard_Ejecutivo.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Helpers
{
  public class Tokens
  {
    public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName,string token, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
    {
      var response = new
      {
        id = identity.Claims.Single(c => c.Type == "id").Value,
        auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
        expires_in = (int)jwtOptions.ValidFor.TotalSeconds,
        name = identity.Claims.Single(c => c.Type == "name").Value,
        tokenAD = token
      };

      return JsonConvert.SerializeObject(response, serializerSettings);
    }
  }
}
