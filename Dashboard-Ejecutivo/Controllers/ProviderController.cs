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
  public class ProviderController : ControllerBase
  {
    private readonly IProviderService _providerService;
    public ProviderController(IProviderService providerService)
    {
      _providerService = providerService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      try
      {
        return new OkObjectResult(_providerService.GetAll());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }


    [HttpPost]
    public IActionResult Add([FromBody] ProviderDTO addProvider)
    {
      try
      {
        return new OkObjectResult(_providerService.Add(addProvider));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody] ProviderDTO updateProvider)
    {
      try
      {
        return new OkObjectResult(_providerService.Update(updateProvider));
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
        var res = _providerService.Delete(id);
        if (res)
        {
          return Ok();
        }
        else
        {
          return new BadRequestObjectResult("Provider no encontrado");
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
      return new OkObjectResult(_providerService.GetOne(id));
    }


  }
}
