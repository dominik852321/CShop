using System;

namespace API.Dtos
{
    public class TableClothToListDTO
    {
        public int Id { get; set; }
        public string Name { get; set;}
        public int Price { get; set; }
        public DateTime DateAdded { get; set; }

        // Rodzaj
        public string Type { get; set; }
  
        // Rozmiar
        public int Length { get; set; }
        public int Width { get; set; }

       
        // Zdjęcie główne
        public string PhotoUrl { get; set; }

    }
}