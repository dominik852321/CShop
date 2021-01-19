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
           
        }
    }
}