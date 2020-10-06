using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Dashboard_Ejecutivo.Data
{
  public class PwaContext
  {
    private static string EndPointPWA = "https://mstech720.sharepoint.com/sites/pwa/_api/projectdata/";
    private static string _digestValue;

    public static string GetDataPwaByQueryString(string tokenAD,string queryString)
    {
      try
      {
        _digestValue = GetFormDigestValue(tokenAD);
        /*using (HttpClient client = new HttpClient())
        {
          client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenAD);
          client.DefaultRequestHeaders.TryAddWithoutValidation("Accept", "application/json;odata=nometadata");
          X - RequestDigest: < FormDigestValue >
            var rawJson = client.GetStringAsync(EndPointPWA + queryString).Result;
          return rawJson;
          Console.WriteLine(rawJson);
        }*/

        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(EndPointPWA + queryString);

        request.Method = "GET";
        request.Accept = "application/json;odata=verbose";
        request.Headers.Add("Authorization", "Bearer " + tokenAD);
        request.Headers.Add("X - RequestDigest", _digestValue);

        //request.Method = "GET";               
        //request.Credentials = new NetworkCredential("leonardo.heis@mstech.la", "L30nard03023");
        //request.ContentType = "application/json";

        using (WebResponse tResponse = request.GetResponse())
        {
          using (Stream dataStreamResponse = tResponse.GetResponseStream())
          {
            using (StreamReader tReader = new StreamReader(dataStreamResponse))
            {
              return tReader.ReadToEnd();
            }
          }
        }
      }
      catch (Exception ex)
      {

        throw ex;
      }

    }

    public static string GetFormDigestValue(string accessToken)
    {
      string requestUrl = $"{"https://mstech720.sharepoint.com/sites/pwa/"}_api/contextinfo";


      HttpWebRequest wreq = HttpWebRequest.Create(requestUrl) as HttpWebRequest;
      CookieContainer cc = new CookieContainer();
      wreq.Headers.Add("Authorization", "Bearer " + accessToken);
      //wreq.Credentials = new NetworkCredential("lheis@mstech.la", "L30nard03023");
      wreq.CookieContainer = cc;
      wreq.Method = "POST";
      wreq.Accept = "application/json;odata=verbose";
      wreq.ContentLength = 0;
      wreq.ContentType = "application/json";
      string result;
      WebResponse wresp = wreq.GetResponse();

      using (System.IO.StreamReader sr = new StreamReader(wresp.GetResponseStream()))
      {
        result = sr.ReadToEnd();
      }


      using (WebClient client = new WebClient())
      {
        client.Headers[HttpRequestHeader.Accept] = "application/json;odata=verbose";
        client.Headers[HttpRequestHeader.Authorization] = $"Bearer {accessToken}";

        try
        {
          var json = client.UploadFile(requestUrl," ");

          // Context Info
          // {"d":{"GetContextWebInformation":{"__metadata":{"type":"SP.ContextWebInformation"},"FormDigestTimeoutSeconds":1800,"FormDigestValue":"0x50266LONGHEXCODEHERE,08 Jun 2018 16:40:51 -0000","LibraryVersion":"16.0.7730.1208","SiteFullUrl":"https://xyz.sharepoint.com/sites/pwa","SupportedSchemaVersions":{"__metadata":{"type":"Collection(Edm.String)"},"results":["14.0.0.0","15.0.0.0"]},"WebFullUrl":"https://xyz.sharepoint.com/sites/pwa"}}}
          //RootObject digest = JsonConvert.DeserializeObject<RootObject>(json); // using the composite object below to deserialize
          //return digest.d.GetContextWebInformation.FormDigestValue;
        }
        catch (Exception ex)
        {
          throw ex;
          //Debug.WriteLine("Error getting FormDigestValue", ex);
        }
        return null;
      }
    }

  }
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
  }
}
