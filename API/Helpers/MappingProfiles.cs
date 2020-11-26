using System.Linq;
using API.Dtos;
using API.Helpers.Resolvers;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToListDto>()
               .ForMember(s => s.ProductType, z => z.MapFrom(x => x.ProductType.Name))
               .ForMember(s => s.ProductRoom, z => z.MapFrom(x => x.ProductRoom.Name))
               .ForMember(s => s.PictureUrl, z => z.MapFrom<ProductToListUrlResolver>());
        
            CreateMap<Product, ProductToReturnDto>()
               .ForMember(s => s.ProductType, z => z.MapFrom(x => x.ProductType.Name))
               .ForMember(s => s.ProductRoom, z => z.MapFrom(x => x.ProductRoom.Name))
               .ForMember(s => s.PictureUrl, z => z.MapFrom<ProductToReturnUrlResolver>());   

            CreateMap<ProductPhotos, ProductPhotosToReturnDto>()
               .ForMember(d => d.PictureUrl, z => z.MapFrom<ProductPhotoUrlResolver>());
               
            CreateMap<Core.Entities.Identity.Address, AddresDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddresDto, Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(s => s.DeliveryMethod, o => o.MapFrom(d => d.DeliveryMethod.ShortName))
                .ForMember(s => s.ShippingPrice, o => o.MapFrom(d => d.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(a => a.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(a => a.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(a => a.ItemOrdered.PictureUrl));
        }
    }
}