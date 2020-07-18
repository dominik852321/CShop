using System;
using Microsoft.AspNetCore.Http;

namespace CurtainShop.API.Dtos
{
    public class CurtainForCreationDTO
    {
        //Informacje ogólne
        public string Name { get; set; }
        public string Price { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }

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