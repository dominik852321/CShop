using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class CurtainToDetailDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        //Właściwości firanki
        public int Height { get; set; }
        public int Width { get; set; }

        public string Room { get; set; }
        public string StickOn { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }
        public string Material1 { get; set; }
        public string Material2 { get; set; }
        public string Material3 { get; set; }

        //Zdjęcie
        public string PhotoUrl { get; set; }

        public ICollection<PhotoToReturnDTO> PhotoMaterial { get; set; }
        

    }
}