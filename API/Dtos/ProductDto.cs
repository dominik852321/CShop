using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int ProductTypeId { get; set; }
        public int ProductRoomId { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string Color1 { get ; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        
        public IFormFile PhotoFile { get; set; }


    }
}