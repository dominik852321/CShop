using System;
using Microsoft.AspNetCore.Http;

namespace CurtainShop.API.Dtos
{
    public class PhotoForCreationDTO
    {
        public string Url { get; set;}
        public DateTime DateAdded { get; set; }

        public IFormFile File  { get; set; }
        
        public string public_id { get; set; }

        public PhotoForCreationDTO()
        {
            DateAdded = DateTime.Now;
        }
    }
}