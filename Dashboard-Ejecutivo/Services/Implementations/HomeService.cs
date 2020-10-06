using AutoMapper;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Services.Interfaces;
using SharepointPWA;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard_Ejecutivo.Services.Implementations
{
  public class HomeService : IHomeService
  {

    dashboardejecutivo_devContext _ctx;
    private readonly IMapper _mapper;

    private readonly ServicesPWA _servicePWA = new ServicesPWA();

    public HomeService(dashboardejecutivo_devContext ctx, IMapper mapper)
    {
      _ctx = ctx;
      _mapper = mapper;
    }

    public List<Dictionary<string, object>> GetAllProjectsPWA()
    {
      try
      {
        List<Dictionary<string,object>> listResponse = _servicePWA.GetAllProjects();
        return listResponse;
      }
      catch (Exception ex)
      {
        throw (ex);
      }
    }

    public Dictionary<string, object> GetProjectByIdPWA(string id)
    {
      try
      {
        Dictionary<string, object> response = _servicePWA.GetProjectById(id);

        return response;
      }
      catch (Exception ex)
      {
        throw (ex);
      }
    }

    public List<RolesDTO> GetRoles()
    {
      return _mapper.Map<List<RolesDTO>>(_ctx.Roles.ToList());
    }

    public List<ProveedoresDTO> GetProveedores()
    {
      return _mapper.Map<List<ProveedoresDTO>>(_ctx.Proveedores.ToList());
    }

    public List<AreasAfectadasDTO> GetAreas()
    {
      return _mapper.Map<List<AreasAfectadasDTO>>(_ctx.AreasAfectadas.ToList());
    }

    public List<ProjectStateDTO> GetStates()
    {
      return _ctx.Etapas.Where(x=>x.Nombre != "Stop" && x.Nombre != "Backlog").Select(x => new ProjectStateDTO
      {
        IdEtapa = x.IdEtapa,
        NombreEtapa = x.Nombre
      }).ToList();
    }
  }
}

