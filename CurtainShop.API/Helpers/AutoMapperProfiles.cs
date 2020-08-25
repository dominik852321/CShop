using AutoMapper;
using CurtainShop.API.Dtos;
using CurtainShop.API.Model;

namespace CurtainShop.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
         CreateMap<UserForRegisterDTO, User>();
         CreateMap<User, UserToReturnDTO>();

          CreateMap<CurtainForCreationDTO, Curtain>();
          CreateMap<Curtain, CurtainToListDTO>();
          CreateMap<Curtain, CurtainToDetailDTO>();
          CreateMap<CurtainToEditDTO, Curtain>();

          CreateMap<TableClothForCreationDTO, TableCloth>();
          CreateMap<TableCloth, TableClothToListDTO>();
          CreateMap<TableCloth, TableClothToDetailDTO>();
          CreateMap<TableClothToEditDTO, TableCloth>();
          
          CreateMap<PhotoForCreationDTO, PhotoMaterial>();
          CreateMap<PhotoMaterial, PhotoToReturnDTO>();
        }
    }
}