using System;

namespace Core.Entities
{
    public class ProductPhotos: BaseEntity
    {
        // Informacje główne zdjęcia
        public string PictureUrl { get; set;}
        public string public_id { get; set; }
        public DateTime DateAdded { get; set; }
        public Boolean MainPhoto { get; set; }


        public Product product { get; set; }
        public int productId { get; set; }
        
    }
}