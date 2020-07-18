using AutoMapper;
using CurtainShop.API.Dtos;
using CurtainShop.API.Model;

namespace CurtainShop.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
          CreateMap<CurtainForCreationDTO, Curtain>();
          CreateMap<Curtain, CurtainToListDTO>();
          CreateMap<Curtain, CurtainToDetailDTO>();
          CreateMap<CurtainToEditDTO, Curtain>();
        }
    }
}