using System.Collections.Generic;
using System.Threading.Tasks;
using CurtainShop.API.Dtos;
using CurtainShop.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CurtainShop.API.Data
{
    public class CurtainRepository: GenericRepository, ICurtainRepository
    {
        private readonly AppDbContext _appDbContext;
        public CurtainRepository(AppDbContext appDbContext): base(appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<IEnumerable<Curtain>> GetCurtains()
              =>await _appDbContext.Curtains.ToListAsync();


        public async Task<Curtain> GetCurtain(int id)
             =>await _appDbContext.Curtains.FirstOrDefaultAsync(z => z.Id==id);
    }
}