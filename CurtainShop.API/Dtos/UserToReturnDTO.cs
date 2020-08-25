using System;

namespace CurtainShop.API.Dtos
{
    public class UserToReturnDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime DateOfBirth { get; set; }  
        public string Role { get; set; }
  

    }
}