using AutoMapper;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.DataDTO;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.Services.Implementations
{
  public class ProviderService : IProviderService
  {
    private dashboardejecutivo_devContext _ctx;

    private readonly IConfiguration _config;
    private readonly IMapper _mapper;


    public ProviderService(dashboardejecutivo_devContext ctx, IConfiguration configuration, IMapper mapper)
    {
      _ctx = ctx;
      _config = configuration;
      _mapper = mapper;

    }

    public List<ProveedoresDTO> GetAll()
    {
      return _mapper.Map<List<ProveedoresDTO>>(_ctx.Proveedores.ToList());
    }

    public bool Delete(int id)
    {
      try
      {
        var provider = _ctx.Proveedores.Where(x => x.IdProveedor == id).FirstOrDefault();
        if (provider != null)
        {
          _ctx.Remove(provider);
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

    public int Add(ProviderDTO addProvider)
    {
      Proveedores provider = _mapper.Map<ProviderDTO, Proveedores>(addProvider);
      
      _ctx.Proveedores.Add(provider);
      return _ctx.SaveChanges();
    }

    public int Update(ProviderDTO updateProvider)
    {
      Proveedores provider = _mapper.Map<ProviderDTO, Proveedores>(updateProvider);
      _ctx.Proveedores.Update(provider);
      return _ctx.SaveChanges();
    }

    public ProveedoresDTO GetOne(int id)
    {
      return _mapper.Map <ProveedoresDTO>(_ctx.Proveedores.Find(id));
    }
  }

}
