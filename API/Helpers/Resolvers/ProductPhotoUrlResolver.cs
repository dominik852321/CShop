using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers.Resolvers
{
    public class ProductPhotoUrlResolver: IValueResolver<ProductPhotos, ProductPhotosToReturnDto, string>
    {   
        private readonly IConfiguration _config;

        public ProductPhotoUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(ProductPhotos source, ProductPhotosToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }

     
    }
}