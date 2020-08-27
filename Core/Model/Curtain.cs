using System;
using System.Collections.Generic;

namespace Core.Model
{
    public class Curtain
    {

        // Informacje ogólne
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }


        // Rodzaj
        public string Room { get; set; } 


        // Informacje szczególne firanki
        public int Height { get; set; }
        public int Width { get; set; }

        public string StickOn { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string Material3 { get; set; }

 

        // Zdjęcie główne
        public string PhotoUrl { get; set; }
        public string public_id { get; set; }

        // Zdjęcia materiału
        public ICollection<PhotoMaterial> PhotoMaterial { get; set; }

        
        


    }
}