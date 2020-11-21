using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndRoomsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndRoomsSpecification(ProductSpecParams productParams)
               : base(x => 
               (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
               (!productParams.RoomId.HasValue || x.ProductRoomId == productParams.RoomId) &&
               (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
               )
        {
            AddInclude(x => x.Photos);
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductRoom);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                         AddOrderBy(p => p.Price);
                         break;
                    case "priceDesc":
                         AddOrderByDescending(p => p.Price);
                         break;     
                    default:
                         AddOrderBy(n => n.Name);
                         break;     
                }
            }
        }

        public ProductsWithTypesAndRoomsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Photos);
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductRoom);
        }
       

      
    }
}