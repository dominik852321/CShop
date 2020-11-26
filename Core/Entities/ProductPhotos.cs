using System;

namespace Core.Entities
{
    public class ProductPhotos: BaseEntity
    {
        // Informacje główne zdjęcia
        public string PictureUrl { get; set;}
        public Product product { get; set; }
        public int productId { get; set; }
        
    }
}