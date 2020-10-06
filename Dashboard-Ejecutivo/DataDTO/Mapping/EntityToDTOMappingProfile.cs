using AutoMapper;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard_Ejecutivo.DataDTO.Mapping
{
  public class EntityToDTOMappingProfile : Profile
  {
    public EntityToDTOMappingProfile()
    {
      //CreateMap<GoogleUserData, UserResponseDTO>()
      //    .ForMember(au => au.PictureUrl, map => map.MapFrom(vm => vm.Picture))
      //    .ForMember(au => au.Id, map => map.MapFrom(vm => vm.Id));
      //CreateMap<FacebookUserData, UserResponseDTO>()
      //    .ForMember(au => au.PictureUrl, map => map.MapFrom(vm => vm.Picture.Data.Url))
      //    .ForMember(au => au.Id, map => map.MapFrom(vm => vm.Id.ToString()));
      CreateMap<MicrosoftGraphUserData, UserResponseDTO>()
          .ForMember(au => au.Email, map => map.MapFrom(vm => vm.Mail))
          .ForMember(au => au.Name, map => map.MapFrom(vm => (vm.FirstName + " " + vm.LastName)))
          .ForMember(au => au.PictureUrl, map => map.MapFrom(vm => vm.Picture.Data.Url));
      CreateMap<Roles, RolesDTO>();      
    }
  }
}
