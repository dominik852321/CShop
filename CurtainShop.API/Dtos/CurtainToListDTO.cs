namespace CurtainShop.API.Dtos
{
    public class CurtainToListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }

        public string PhotoUrl { get; set; }
    }
}