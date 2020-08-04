namespace CurtainShop.API.Dtos
{
    public class CurtainToEditDTO
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
       
        //Właściwości firanki
        public int Height { get; set; }
        public int Width { get; set; }

        public string StickOn { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }

        public string Room { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string Material3 { get; set; }

        //Zdjęcie
        public string PhotoUrl { get; set; }
        
    }
}