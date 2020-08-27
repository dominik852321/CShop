using System;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class TableClothForCreationDTO
    {
        public string Name { get; set;}
        public int Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        public TableClothForCreationDTO()
        {
            DateAdded = DateTime.Now;
        }

        // Rodzaj
        public string Type { get; set; }
  
        // Rozmiar
        public int Length { get; set; }
        public int Width { get; set; }

        // Informacje szczególne obrusu/podszewki
        public string Material1 { get; set; }
        public string Material2 { get; set;}

        public string Color1 { get; set; }
        public string Color2 { get; set; }

        // Zdjęcie główne
        public string PhotoUrl { get; set; }
        public IFormFile File { get; set; }
        public string public_id { get; set; }

    }
}