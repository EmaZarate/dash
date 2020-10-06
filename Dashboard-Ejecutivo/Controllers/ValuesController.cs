using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard_Ejecutivo.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : Controller
  {
    /*protected SharePointAcsContext _spContext;
    private string _appHostUrl;
    private string _pwaUrl;
    private string _accessToken;
    private string _digestValue;

    List<string> _model = new List<string>();

    //=====================================================================================================
    protected override void OnActionExecuting(ActionExecutingContext filterContext)
    {
      _spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext) as SharePointAcsContext;

      _pwaUrl = _spContext.SPHostUrl.AbsoluteUri;
      _appHostUrl = Request.Url.Authority;

      base.OnActionExecuting(filterContext);
    }
    //=====================================================================================================
    // Main Page for Testing
    public ActionResult Index()
    {
      GetTokenAndMakeCalls();
      return View(_model);
    }

    //=====================================================================================================
    public void GetTokenAndMakeCalls()
    {
      _accessToken = GetAccessToken();
      _digestValue = GetFormDigestValue(_accessToken);

      CSOM_ProjectCounts();
      ODataPost_ProjectList();
      ODataGet_ProjectList();
    }
    //=====================================================================================================
    public string GetAccessToken()
    {
      Debug.WriteLine("OData Getting access token.");
      try
      {
        // Get an access token from the original context token (preferred so we can store the context token since it doesn't expire as quickly)
        SharePointContextToken contextToken = TokenHelper.ReadAndValidateContextToken(_spContext.ContextToken, _appHostUrl);
        var response = TokenHelper.GetAccessToken(contextToken, new Uri(_pwaUrl).Authority);
        return response.AccessToken;
      }
      catch (Exception ex)
      {
        Debug.WriteLine("OData Error Getting Access Token", ex);
        throw;
      }
    }

    //=====================================================================================================
    // https://stackoverflow.com/questions/41719686/accessing-sharepoint-project-web-app-rest-from-separate-app 
    public string GetFormDigestValue(string accessToken)
    {
      string requestUrl = $"{_pwaUrl}_api/contextinfo";

      using (WebClient client = new WebClient())
      {
        client.Headers[HttpRequestHeader.Accept] = "application/json;odata=verbose";
        client.Headers[HttpRequestHeader.Authorization] = $"Bearer {accessToken}";

        try
        {
          var json = client.UploadString(requestUrl, "");

          // Context Info
          // {"d":{"GetContextWebInformation":{"__metadata":{"type":"SP.ContextWebInformation"},"FormDigestTimeoutSeconds":1800,"FormDigestValue":"0x50266LONGHEXCODEHERE,08 Jun 2018 16:40:51 -0000","LibraryVersion":"16.0.7730.1208","SiteFullUrl":"https://xyz.sharepoint.com/sites/pwa","SupportedSchemaVersions":{"__metadata":{"type":"Collection(Edm.String)"},"results":["14.0.0.0","15.0.0.0"]},"WebFullUrl":"https://xyz.sharepoint.com/sites/pwa"}}}
          RootObject digest = JsonConvert.DeserializeObject<RootObject>(json); // using the composite object below to deserialize
          return digest.d.GetContextWebInformation.FormDigestValue;
        }
        catch (Exception ex)
        {
          Debug.WriteLine("Error getting FormDigestValue", ex);
        }
        return null;
      }
    }
    //=====================================================================================================
    private void ODataPost_ProjectList()
    {
      string requestUrl = $"{_pwaUrl}_api/ProjectData/Projects";

      using (WebClient client = new WebClient())
      {
        client.Headers[HttpRequestHeader.ContentType] = "application/x-www-form-urlencoded";
        client.Headers.Add("X-RequestDigest", _digestValue);

        try
        {
          string response = client.UploadString(requestUrl, "POST", "");
          _model.Add($"OData POST:{response}");
        }
        catch (Exception ex)
        {
          Debug.WriteLine($"Error during POST. {ex.Message}");
          _model.Add($"OData POST:{ex.Message}");
        }
      }
    }
    //=====================================================================================================
    private void ODataGet_ProjectList()
    {
      string request = "_api/ProjectData/Projects";
      string requestUrl = $"{_pwaUrl}{request}";

      using (WebClient client = new WebClient())
      {
        client.Headers[HttpRequestHeader.Accept] = "application/json;odata=verbose";
        client.Headers.Add("X-RequestDigest", _digestValue);

        try
        {
          string response = client.DownloadString(requestUrl);

          _model.Add($"OData GET:{response}");
        }
        catch (Exception ex)
        {
          Debug.WriteLine($"Error during GET. {ex.Message}");
          _model.Add($"OData GET:{ex.Message}");
        }
      }
    }

    //=====================================================================================================
    // CSOM
    //=====================================================================================================
    public void CSOM_ProjectCounts()
    {
      try
      {
        using (var projectContext = GetProjectContextWithAccessToken(_pwaUrl, _accessToken))
        {
          projectContext.Load(projectContext.Projects);
          projectContext.ExecuteQuery();
          Debug.Write(projectContext.Projects.Count);
          _model.Add($"CSOM:SUCCESS, Projects:{projectContext.Projects.Count}");
        }
      }
      catch (Exception ex)
      {
        Debug.WriteLine($"Error during CSOM. {ex.Message}");
        _model.Add($"CSOM:{ex.Message}");
      }

    }
    //=====================================================================================================
    public static ProjectContext GetProjectContextWithAccessToken(string targetUrl, string accessToken)
    {
      Uri targetUri = new Uri(targetUrl);

      ProjectContext projectContext = new ProjectContext(targetUrl);

      projectContext.AuthenticationMode = ClientAuthenticationMode.Anonymous;
      projectContext.FormDigestHandlingEnabled = false;
      projectContext.ExecutingWebRequest +=
              delegate (object oSender, WebRequestEventArgs webRequestEventArgs)
              {
                webRequestEventArgs.WebRequestExecutor.RequestHeaders["Authorization"] = "Bearer " + accessToken;
              };

      return projectContext;
    }
  }

  //=====================================================================================================
  // For deserializing the /clientinfo
  // http://json2csharp.com/ from return json of /contextinfo
  public class Metadata
  {
    public string type { get; set; }
  }

  public class Metadata2
  {
    public string type { get; set; }
  }

  public class SupportedSchemaVersions
  {
    public Metadata2 __metadata { get; set; }
    public List<string> results { get; set; }
  }

  public class GetContextWebInformation
  {
    public Metadata __metadata { get; set; }
    public int FormDigestTimeoutSeconds { get; set; }
    public string FormDigestValue { get; set; }
    public string LibraryVersion { get; set; }
    public string SiteFullUrl { get; set; }
    public SupportedSchemaVersions SupportedSchemaVersions { get; set; }
    public string WebFullUrl { get; set; }
  }

  public class D
  {
    public GetContextWebInformation GetContextWebInformation { get; set; }
  }

  public class RootObject
  {
    public D d { get; set; }
  }*/
  }

}
