using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToListDto>()
               .ForMember(s => s.ProductType, z => z.MapFrom(x => x.ProductType.Name))
               .ForMember(s => s.ProductRoom, z => z.MapFrom(x => x.ProductRoom.Name))
               .ForMember(s => s.PictureUrl, z => { z.MapFrom(x => x.Photos.FirstOrDefault(p => p.MainPhoto).PictureUrl);});
            CreateMap<Product, ProductToReturnDto>()
               .ForMember(s => s.ProductType, z => z.MapFrom(x => x.ProductType.Name))
               .ForMember(s => s.ProductRoom, z => z.MapFrom(x => x.ProductRoom.Name))
               .ForMember(s => s.PictureUrl, z => { z.MapFrom(x => x.Photos.FirstOrDefault(p => p.MainPhoto).PictureUrl);});
        }
    }
}