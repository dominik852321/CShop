using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;
        
        public ProductRepository(AppDbContext appDbContext)
        {
             _appDbContext = appDbContext;
        }

        public async Task<IReadOnlyList<Product>> GetProductAsync()
        {
            return await _appDbContext.Products
            .Include(s => s.ProductType)
            .Include(s => s.ProductRoom)
            .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _appDbContext.Products
            .Include(s => s.ProductType)
            .Include(s => s.ProductRoom)
            .Include(s => s.Photos)
            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IReadOnlyList<ProductRoom>> GetProductRoomsAsync()
        {
            return await _appDbContext.ProductRooms.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _appDbContext.ProductTypes.ToListAsync();
        }
    }
}