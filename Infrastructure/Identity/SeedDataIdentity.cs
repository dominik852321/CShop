using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class SeedDataIdentity
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser 
                {
                    DisplayName = "Steve",
                    Email = "Steve@test.com",
                    UserName = "Steve@test.com",
                    Address = new Address
                    {
                        FirstName = "Steve",
                        LastName = "Stevy",
                        Street = "New York",
                        State = "NY",
                        Zipcode = "90-230"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                
                var user1 = new AppUser 
                {
                    DisplayName = "Stevea",
                    Email = "Stevae@test.com",
                    UserName = "Steave@test.com",
                    Address = new Address
                    {
                        FirstName = "Stevae",
                        LastName = "Steavy",
                        Street = "New Yaork",
                        State = "NaY",
                        Zipcode = "930-230"
                    }
                };
                await userManager.CreateAsync(user1, "Pa$$w0rd");
            }
        }
    }
}