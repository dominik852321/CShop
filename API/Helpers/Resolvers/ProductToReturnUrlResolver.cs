using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers.Resolvers
{
    public class ProductToReturnUrlResolver: IValueResolver<Product, ProductToReturnDto, string>
    {   
        private readonly IConfiguration _config;

        public ProductToReturnUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                 return _config["ApiUrl"] + source.PictureUrl;
            }
           return null;
        }
    }

}