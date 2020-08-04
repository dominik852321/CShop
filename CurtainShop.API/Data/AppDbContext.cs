using CurtainShop.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CurtainShop.API.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
        public DbSet<Curtain> Curtains { get; set; }
        public DbSet<PhotoMaterial> Photos { get; set; }
        
    }
}