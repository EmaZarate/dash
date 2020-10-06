using AutoMapper;
using AutoMapper.Configuration;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Implementations
{
  public class RolService : IRolService
  {
    private dashboardejecutivo_devContext _ctx;

    public RolService(dashboardejecutivo_devContext ctx)
    {
      _ctx = ctx;
    }

    public int Add(RolesDTO addRolEquipo)
    {
      RolesEquipo rolesEquipo = new RolesEquipo()
      {
        Descripcion = addRolEquipo.Descripcion
      };
      _ctx.RolesEquipos.Add(rolesEquipo);
      return _ctx.SaveChanges();
    }

    public bool Delete(int id)
    {
      try
      {
        var rolEquipo = _ctx.RolesEquipos.Where(x => x.IdRol == id).FirstOrDefault();
        if (rolEquipo != null)
        {
          _ctx.Remove(rolEquipo);
          _ctx.SaveChanges();
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
        throw;
      }
    }

    public List<RolesDTO> GetAll()
    {

      return _ctx.RolesEquipos.Select(x => new RolesDTO
      {
        IdRol = x.IdRol,
        Descripcion = x.Descripcion
      }).ToList();
      
    }

    public RolesDTO GetOne(int id)
    {

      return _ctx.RolesEquipos.Where(x => x.IdRol == id).Select(x => new RolesDTO
      {
        IdRol = x.IdRol,
        Descripcion = x.Descripcion
      }).FirstOrDefault();
      
    }

    public int Update(RolesDTO updateRolEquipo)
    {
      RolesEquipo rolesEquipo = null;
      rolesEquipo = _ctx.RolesEquipos.Where(x => x.IdRol == updateRolEquipo.IdRol).SingleOrDefault();

      if (rolesEquipo != null)
      {
        rolesEquipo.Descripcion = updateRolEquipo.Descripcion;
      }
      return _ctx.SaveChanges();
    }
  }
}
