using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification: BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
               : base(x => 
               (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
               (!productParams.RoomId.HasValue || x.ProductRoomId == productParams.RoomId) &&
               (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
               )
        {

        }
    }
}