using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Models
{
  internal class MicrosoftGraphUserData
  {
    public string Id { get; set; }
    public string UserPrincipalName { get; set; }
    public string Mail { get; set; }
    public string JobTitle { get; set; }
    [JsonProperty("givenName")]
    public string FirstName { get; set; }
    [JsonProperty("surname")]
    public string LastName { get; set; }
    public string MobilePhone { get; set; }
    public string OfficeLocation { get; set; }
    public MicrosoftGraphPictureData Picture { get; set; }
  }

  internal class MicrosoftGraphPictureData
  {
    public MicrosoftGraphPicture Data { get; set; }
  }
  internal class MicrosoftGraphPicture
  {
    public int Height { get; set; }
    public int Width { get; set; }
    [JsonProperty("is_silhouette")]
    public bool IsSilhouette { get; set; }
    public string Url { get; set; }
  }
  public class MicrosoftGraphAppAccessToken
  {
    [JsonProperty("token_type")]
    public string TokenType { get; set; }
    [JsonProperty("access_token")]
    public string AccessToken { get; set; }
    [JsonProperty("expires_in")]
    public int ExpiresIn { get; set; }
    [JsonProperty("refresh_token")]
    public string RefreshToken { get; set; }

    public DateTime TimeAcquired { get; set; }
  }
}
