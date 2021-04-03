using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Entities.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Identity
{
    public class SeedDataIdentity
    {
        public static async Task SeedUsersAndRolesAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
             if (!userManager.Users.Any() | roleManager.Roles.Any())
            {
                 var rolesAdmin = new IdentityRole()
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                };
                await roleManager.CreateAsync(rolesAdmin);

                var rolesUser = new IdentityRole()
                {
                    Name = "User",
                    NormalizedName = "USER"
                };
                await roleManager.CreateAsync(rolesUser); 

                var admin = new AppUser 
                {
                    DisplayName = "Admin",
                    Email = "domin852321@gmail.com",
                    UserName = "Admin",
                    Address = new Address
                    {
                        FirstName = "Dominik",
                        LastName = "Dominik",
                        Street = "Warszawa",
                        State = "Polska",
                        Zipcode = "90-230"
                    }
                    
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRoleAsync(admin, rolesAdmin.Name);

                 var user = new AppUser 
                {
                    DisplayName = "User",
                    Email = "User@test.com",
                    UserName = "User@test.com",
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
                await userManager.AddToRoleAsync(user, rolesUser.Name);
              
            }
        }
    }
}