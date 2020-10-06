using AutoMapper;
using Dashboard_Ejecutivo.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO.Mapping
{
  public class DTOToEntityMappingProfile: Profile
  {
    public DTOToEntityMappingProfile()
    {
      CreateMap<ProjectDTO, Proyectos>()
          .ForMember(x => x.EquipoPorProyecto, opt => opt.MapFrom(y => y.EquiposPorProyecto));
      CreateMap<IssuesDTO, Issues>();
      CreateMap<ProjectGoalsDTO, Objetivos>();
      CreateMap<ProjectStateDocumentDTO, ProyectoEtapaDocumento>();
      CreateMap<ProjectStateDTO, ProyectoEtapas>()
          .ForMember(x => x.PorcentajeDeAvance, opt => opt.MapFrom(x => x.PorcentajeAvance));
      CreateMap<ProjectProviderDTO, ProyectoProveedor>();
      CreateMap<ProjectRolesDTO, ProyectoRoles>();
      CreateMap<RisksDTO, Riesgos>()
          .ForMember(x => x.IdRiesgo, opt => opt.MapFrom(x => x.IdRisks));
      CreateMap<ProjectTeamDTO, EquipoPorProyecto>();
      CreateMap<ProjectActivitiesDTO, Actividades>();
      CreateMap<ProjectAreasAffectedDTO, ProyectoAreasAfetadas>();
      
    }
  }
}
