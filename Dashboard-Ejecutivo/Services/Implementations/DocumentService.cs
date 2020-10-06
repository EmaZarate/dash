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
  public class DocumentService : IDocumentService
  {

    private dashboardejecutivo_devContext _ctx;

    private readonly IConfiguration _config;
    private readonly IMapper _mapper;


    public DocumentService(dashboardejecutivo_devContext ctx, IConfiguration configuration, IMapper mapper)
    {
      _ctx = ctx;
      _config = configuration;
      _mapper = mapper;

    }

    public int Add(DocumentDTO addDocument)
    {

      Documentos document = new Documentos();
      document.IdEtapaNavigation = _ctx.Etapas.Where(x => x.IdEtapa == addDocument.IdEtapa).Select(x => x).SingleOrDefault();
      document.IdEtapa = addDocument.IdEtapa;
      document.Nombre = addDocument.Nombre;
      document.Obligatorio = addDocument.Obligatorio;
      _ctx.Documentos.Add(document);
      return _ctx.SaveChanges();
    }

    public bool Delete(int id)
    {
      try
      {
        var document = _ctx.Documentos.Where(x => x.IdDocumento == id).FirstOrDefault();
        if (document != null)
        {
          _ctx.Remove(document);
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

    public List<DocumentDTO> GetAll()
    {
      List<DocumentDTO> listDocument = _ctx.Documentos.Select(x => new DocumentDTO
      {

        IdDocumento = x.IdDocumento,
        Nombre = x.Nombre,
        Obligatorio = x.Obligatorio,
        NombreEtapa = x.IdEtapaNavigation.Nombre.Trim().ToString()

      }).ToList();

      return listDocument;
    }

    public DocumentDTO GetOne(int id)
    {
      return _ctx.Documentos.Where(x => x.IdDocumento == id).Select(x=> new DocumentDTO {
        IdDocumento = x.IdDocumento,
        NombreEtapa = x.IdEtapaNavigation.Nombre,
        Obligatorio = x.Obligatorio,
        IdEtapa = x.IdEtapa,
        Nombre = x.Nombre        
      }).SingleOrDefault();
    }

    public int Update(DocumentDTO updateDocument)
    {
      Documentos document = _ctx.Documentos.Where(x => x.IdDocumento == updateDocument.IdDocumento).Select(x => x).SingleOrDefault();
      document.IdEtapaNavigation = _ctx.Etapas.Where(x => x.IdEtapa == updateDocument.IdEtapa).Select(x => x).SingleOrDefault();
      document.IdEtapa = updateDocument.IdEtapa;
      document.Nombre = updateDocument.Nombre;
      document.Obligatorio = updateDocument.Obligatorio;
      _ctx.Documentos.Update(document);
      return _ctx.SaveChanges();
    }
  }
}
