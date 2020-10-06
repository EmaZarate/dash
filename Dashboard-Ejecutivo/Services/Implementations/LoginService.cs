using Dashboard_Ejecutivo.Auth;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Helpers;
using Dashboard_Ejecutivo.Models;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Implementations
{
  public class LoginService : ILoginService
  {
    private dashboardejecutivo_devContext _ctx;
    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;
    public LoginService(dashboardejecutivo_devContext ctx, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
    {
      _ctx = ctx;
      _jwtFactory = jwtFactory;
      _jwtOptions = jwtOptions.Value;
    }
    public async Task<string> LoginUser(CredentialsDTO credentials)
    {

      var user = _ctx.Usuarios.Where(x => x.CodUsuario == credentials.UserName.ToUpper()).FirstOrDefault();
      if (user == null)
      {
        return null;
      }
      var identity = await GetClaimsIdentity(user);

      return await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName,credentials.TokenAD, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
    }

    private async Task<ClaimsIdentity> GetClaimsIdentity(Usuarios user)
    {
      return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(user.Descripcion, user.CodUsuario, Convert.ToInt32(user.IdPerfilUsuario)));
    }
  }
}
