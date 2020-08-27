using System;

namespace API.Dtos
{
    public class UserForRegisterDTO
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }  
        public DateTime Created { get; set; }

        public string Role { get; set; }

        public UserForRegisterDTO()
        {
            Created = DateTime.Now;
        }
    
    }
}