using System;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class CurtainForCreationDTO
    {
        //Informacje ogólne
        public string Name { get; set; }
        public int Price { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string Description { get; set;}

        //Informacje szczególne
        public string Room { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string Material3 { get; set; } 

        //Zdjęcie
        public string PhotoUrl { get; set; }
        public IFormFile File { get; set; }
        public string public_id { get; set; }
        

        
        //Automatyczne ustawienie
        public DateTime DateAdded { get; set; }
        public CurtainForCreationDTO()
        {
            DateAdded = DateTime.Now;
        }

    }
}