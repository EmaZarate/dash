using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AutoMapper;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Models;
using Dashboard_Ejecutivo.Models.Interfaces;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using static Dashboard_Ejecutivo.Models.MicrosoftGraphAuthSetting;

namespace Dashboard_Ejecutivo.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class ExternalAuthController : ControllerBase
  {
   // private readonly dashboardejecutivo_devContext _context;
    private readonly MicrosoftGraphAuthSettings _msftAuthSettings;
    private readonly IMapper _mapper;
    private readonly ILoginService _loginService;

    public ExternalAuthController(
      IOptions<MicrosoftGraphAuthSettings> msftAuthSettingsAccessor,
      IMapper mapper,
      ILoginService loginservice
      //dashboardejecutivo_devContext context
      )
    {
      _msftAuthSettings = msftAuthSettingsAccessor.Value;
      _mapper = mapper;
      _loginService = loginservice;
     // _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
      return new string[] { "value1", "value2" };
    }

    [HttpPost]
    public async Task<IActionResult> MicrosoftGraph([FromBody]ExternalAuthDTO model)
    {
      //Construct body for request
      try
      {
        var requestBody = MakeRequestBody(_msftAuthSettings, model.AccessToken);

        string accessTokenResponse = GetTokenUserGraph(requestBody).Result;

        MicrosoftGraphAppAccessToken accesTokenGraph = JsonConvert.DeserializeObject<MicrosoftGraphAppAccessToken>(accessTokenResponse);
        if (string.IsNullOrEmpty(accesTokenGraph.AccessToken)) {
          return StatusCode(511, accessTokenResponse);
        }

        UserResponseDTO user = GetUserInfoGraph(accessTokenResponse).Result;

        CredentialsDTO credentials = new CredentialsDTO();
        credentials.UserName = user.Email;
        credentials.TokenAD = model.AccessToken;

        var token = await _loginService.LoginUser(credentials);

        if (token != null)
        {
          Dictionary<string, string> dicToken = JsonConvert.DeserializeObject<Dictionary<string, string>>(token);
          dicToken.Add("userName", user.Email);
          return new OkObjectResult(dicToken);
        }
        else
        {
          return StatusCode(511, "Usuario no registrado");
          //return new BadRequestObjectResult("Usuario o contraseña incorrecto");
        }
      }
      catch (Exception ex)
      {
        return StatusCode(511, ex.Message.ToString());
      }
    }

    private async Task<UserResponseDTO> GetUserInfoGraph(string accessToken)
    {
      MicrosoftGraphAppAccessToken accesTokenGraph = JsonConvert.DeserializeObject<MicrosoftGraphAppAccessToken>(accessToken);
      accesTokenGraph.TimeAcquired = DateTime.Now;


      string userInfoResponse = string.Empty;
      using (var httpClient = new HttpClient())
      {
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(accesTokenGraph.TokenType, accesTokenGraph.AccessToken);
        userInfoResponse = await httpClient.GetStringAsync($"https://graph.microsoft.com/v1.0/me");
      }

      UserResponseDTO userResponse = _mapper.Map<UserResponseDTO>(JsonConvert.DeserializeObject<MicrosoftGraphUserData>(userInfoResponse));

      return userResponse;
    }

    private async Task<string> GetTokenUserGraph(List<KeyValuePair<string, string>> requestBody)
    {
      //Make request and convert response to json
      using (var httpClient = new HttpClient())
      {
        using (var content = new FormUrlEncodedContent(requestBody))
        {
          content.Headers.Clear();
          content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");

          var TokenResponse = await httpClient.PostAsync($"https://login.microsoftonline.com/common/oauth2/v2.0/token", content);
          return TokenResponse.Content.ReadAsStringAsync().Result;
        }
      }
    }

    private List<KeyValuePair<string, string>> MakeRequestBody(IExternalAuthSettings _authSettings, string accessToken)
    {
      var list = new List<KeyValuePair<string, string>>();

      list.Add(new KeyValuePair<string, string>("code", accessToken));
      list.Add(new KeyValuePair<string, string>("client_id", _authSettings.AppId));
      list.Add(new KeyValuePair<string, string>("client_secret", _authSettings.AppSecret));
      list.Add(new KeyValuePair<string, string>("redirect_uri", _authSettings.RedirectUri));
      list.Add(new KeyValuePair<string, string>("grant_type", "authorization_code"));

      return list;
    }
  }
}
