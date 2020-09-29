using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set ;}
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }


        public string ProductType { get; set; }
        public string ProductRoom { get; set; } 

        public int Height { get; set; }
        public int Width { get; set; }
        public string Color1 { get ; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }


        public ICollection<ProductPhotosToReturnDto> Photos { get; set; }

        public string PictureUrl { get; set; }
    }
}