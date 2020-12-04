using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers.Resolvers
{
    public class ProductToListUrlResolver: IValueResolver<Product, ProductToListDto, string>
    {   
        private readonly IConfiguration _config;

        public ProductToListUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToListDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                 return _config["ApiUrl"] + source.PictureUrl;
            }
           return null;
        }
    }
}