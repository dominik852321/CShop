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
            AddOrderByDescending(x => x.DateAdded);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "addAsc":
                         AddOrderBy(p =>p.Id);
                         break;
                    case "priceAsc":
                         AddOrderBy(p => p.Price);
                         break;
                    case "priceDesc":
                         AddOrderByDescending(p => p.Price);
                         break;     
                    default:
                          AddOrderByDescending(p =>p.Id);
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

        public ProductsWithTypesAndRoomsSpecification()
        {
            AddInclude(x => x.ProductRoom);
            AddInclude(x => x.ProductType);
            AddOrderByDescending(x => x.Id);
        }

        
        public ProductsWithTypesAndRoomsSpecification(int pageSize, int pageIndex) 
        {
            ApplyPaging(pageSize * (pageIndex -1), pageSize);
        }


       

      
    }
}