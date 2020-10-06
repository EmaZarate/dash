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
  public class ProjectController : ControllerBase
  {
    private readonly IProjectService _projectService;
    public ProjectController(IProjectService projectService)
    {
      _projectService = projectService;
    }

    [HttpGet("{enviroment}")]
    public IActionResult GetAll(int enviroment)
    {
      try
      {
        return new OkObjectResult(_projectService.GetAll(enviroment));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet("{enviroment}")]
    public IActionResult GetAllProjectName(int enviroment)
    {
      try
      {
        return new OkObjectResult(_projectService.GetAllProjectName(enviroment));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }   

    [HttpGet("{id}")]
    public IActionResult GetProjectById(int id)
    {
      try
      {
        return new OkObjectResult(_projectService.GetProjectById(id));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public IActionResult GetAllProjectStatusById(int id)
    {
      try
      {
        return new OkObjectResult(_projectService.GetAllProjectStatusById(id));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPost]
    public IActionResult PublishProject([FromBody] List<string> listGuidProject)
    {
      try
      {
        return new OkObjectResult(_projectService.PublishProject(listGuidProject));
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult Add()
    {
      try
      {
        return new OkObjectResult(_projectService.Add());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpPut]
    public IActionResult Update([FromBody] ProjectDTO updateProject)
    {
      try
      {
        return new OkObjectResult(_projectService.Update(updateProject));
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
        var res = _projectService.DeleteProject(id);
        if (res)
        {
          return Ok();
        }
        else
        {
          return new BadRequestObjectResult("Proyecto no encontrado");
        }
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

  }
}
