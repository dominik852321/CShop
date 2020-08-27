using System;

namespace Core.Model
{
    public class PhotoMaterial
    {
        // Informacje główne zdjęcia
        public int id { get; set; }
        public string Url { get; set;}
        public string public_id { get; set; }
        public DateTime DateAdded { get; set; }

        
        public int CurtainId { get; set; }
        public int TableClothId { get; set; }
        
    }
}