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
  public class DocumentController : ControllerBase
  {
    private readonly IDocumentService _documentService;
    public DocumentController(IDocumentService documentService)
    {
      _documentService = documentService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      try
      {
        return new OkObjectResult(_documentService.GetAll());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }


    [HttpPost]
    public IActionResult Add([FromBody] DocumentDTO addProvider)
    {
      try
      {
        return new OkObjectResult(_documentService.Add(addProvider));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody] DocumentDTO updateProvider)
    {
      try
      {
        return new OkObjectResult(_documentService.Update(updateProvider));
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
        var res = _documentService.Delete(id);
        if (res)
        {
          return Ok();
        }
        else
        {
          return new BadRequestObjectResult("Documento no encontrado");
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
      return new OkObjectResult(_documentService.GetOne(id));
    }


  }
}
