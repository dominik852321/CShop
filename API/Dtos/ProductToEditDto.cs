using Core.Entities;

namespace API.Dtos
{
    public class ProductToEditDto
    {
        public string Name { get; set ;}
        public int Price { get; set; }
        public string Description { get; set; }


        //Rodzaj produktu
        public int ProductTypeId { get; set; }
        public int ProductRoomId { get; set; }

        //Szczegóły produktu
        public int Height { get; set; }
        public int Width { get; set; }
        public string Color1 { get ; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
    }
}