using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class RolController : ControllerBase
  {
    private readonly IRolService _rolService;
    public RolController(IRolService rolService)
    {
      _rolService = rolService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      try
      {
        return new OkObjectResult(_rolService.GetAll());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPost]
    public IActionResult Add([FromBody] RolesDTO addProvider)
    {
      try
      {
        return new OkObjectResult(_rolService.Add(addProvider));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody] RolesDTO updateProvider)
    {
      try
      {
        return new OkObjectResult(_rolService.Update(updateProvider));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }


    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      try
      {
        var res = _rolService.Delete(id);
        if (res)
        {
          return Ok();
        }
        else
        {
          return new BadRequestObjectResult("Rol no encontrado");
        }
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public IActionResult GetOne(int id)
    {
      return new OkObjectResult(_rolService.GetOne(id));
    }


  }
}
