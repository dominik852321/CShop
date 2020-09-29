using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Product: BaseEntity
    {
        public string Name { get; set ;}
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }


        //Rodzaj produktu
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductRoom ProductRoom { get; set; } 
        public int ProductRoomId { get; set; }

        //Szczegóły produktu
        public int Height { get; set; }
        public int Width { get; set; }
        public string Color1 { get ; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }


        //Zdjęcia produktu
        public ICollection<ProductPhotos> Photos { get; set; }


    }
}