using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndRoomsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndRoomsSpecification()
        {
            AddInclude(x => x.Photos);
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductRoom);
        }

        public ProductsWithTypesAndRoomsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Photos);
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductRoom);
        }
    }
}