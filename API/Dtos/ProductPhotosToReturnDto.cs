using System;

namespace API.Dtos
{
    public class ProductPhotosToReturnDto
    {
        public int Id {get; set;}
        public string PictureUrl { get; set; }
        public DateTime DateAdded {get; set;}    
        public Boolean MainPhoto {get; set;}     
    }
}