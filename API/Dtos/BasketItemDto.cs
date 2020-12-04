using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }

        [Required]
        [Range(0.1,double.MaxValue, ErrorMessage="Cena nie może wynosić 0")]
        public decimal Price { get; set; }
        
        [Required]
        [Range(1, double.MaxValue, ErrorMessage="Ilość sztuk nie może być mniejsza niż 1")]
        public int Quantity { get; set; }

        public string PictureUrl { get; set; }
        [Required]
        public string Room { get; set; }
        [Required]
        public string Type { get; set; }

        [Required]
        public int Width { get; set; }
        [Required]
        public int Height { get; set; }
    }
}