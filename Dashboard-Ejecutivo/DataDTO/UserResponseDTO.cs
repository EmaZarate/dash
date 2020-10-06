using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO
{
  public class UserResponseDTO
  {
    public string Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Gender { get; set; }
    public string Locale { get; set; }
    public string PictureUrl { get; set; }
  }
}
