using System;

namespace API.Dtos
{
    public class ProductToListDto
    {
        public int Id { get; set; }
        public string Name { get; set ;}
        public decimal Price { get; set; }
        public DateTime DateAdded { get; set; }
        public string ProductType { get; set; }
        public string ProductRoom { get; set; } 
        public int Height { get; set; }
        public int Width { get; set; }

        public string PictureUrl { get; set ;}

    }
}