using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;


namespace Dashboard_Ejecutivo.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class HomeController : ControllerBase
  {
    private readonly IHomeService _homeService;
    private readonly IProjectService _projectService;

    public HomeController(IHomeService homeService, IProjectService projectService)
    {
      _homeService = homeService;
      _projectService = projectService;
    }

    [HttpGet]
    public IActionResult GetAllProjectsPWA()
    {
      try
      {
        List<Dictionary<string,object>> listDicProjects = _homeService.GetAllProjectsPWA();
        bool isInsert = _projectService.InsertOrUpdateProject(listDicProjects);
        Dictionary<string, object> dicProject = new Dictionary<string, object>();

        if (!isInsert)
        {
          dicProject.Add("Validacion", "Ha ocurrido un error al sincronizar");
          return new OkObjectResult(dicProject);
        }

        dicProject.Add("Ok", "Los proyectos se han actualizado correctamente");
        return new OkObjectResult(dicProject);
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public IActionResult GetProjectByIdPWA(string id)
    {
      try
      {
        Dictionary<string, object> dicProject = _homeService.GetProjectByIdPWA(id);
        bool isInsert = _projectService.InsertOrUpdateProject(dicProject);
        dicProject.Clear();

        if (!isInsert)
        {
          dicProject.Add("Validacion", "El proyecto ya se encuentra actualizado");
          return new OkObjectResult(dicProject);
        }

        dicProject.Add("Ok", "El proyecto se ha actualizado correctamente");
        return new OkObjectResult(dicProject);
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetRoles()
    {
      try
      {
        return new OkObjectResult(_homeService.GetRoles());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetProveedores()
    {
      try
      {
        return new OkObjectResult(_homeService.GetProveedores());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetAreas()
    {
      try
      {
        return new OkObjectResult(_homeService.GetAreas());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetStates()
    {
      try
      {
        return new OkObjectResult(_homeService.GetStates());
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }

  }
}

