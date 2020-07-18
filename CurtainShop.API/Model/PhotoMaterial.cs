using System;

namespace CurtainShop.API.Model
{
    public class PhotoMaterial
    {
        //informacje główne zdjęcia
        public int id { get; set; }
        public string Url { get; set;}
        public DateTime DateAdded { get; set; }
        
        public Curtain Curtain { get; set; }
        public int CurtainId { get; set; }
        
    }
}