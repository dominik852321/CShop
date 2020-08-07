using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CurtainShop.API.Data;
using CurtainShop.API.Helpers;
using CurtainShop.API.Interface;
using CurtainShop.API.Model;
using Microsoft.EntityFrameworkCore;

namespace CurtainShop.API.Repository
{
    public class CurtainRepository: GenericRepository, ICurtainRepository
    {
        private readonly AppDbContext _appDbContext;
        public CurtainRepository(AppDbContext appDbContext): base(appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<PagedList<Curtain>> GetCurtains(CurtainParams curtainParams)
         {
              var curtains = _appDbContext.Curtains.Include(p => p.PhotoMaterial).OrderByDescending(z => z.DateAdded).AsQueryable();

              if(curtainParams.MinValue!=0 || curtainParams.MaxValue!=1000)
              {
                  curtains = curtains.Where(z => z.Price >= curtainParams.MinValue && z.Price <= curtainParams.MaxValue);
              }

              if(curtainParams.Room != null )
              {
                  curtains = curtains.Where(z => z.Room.ToLower() == curtainParams.Room.ToLower());
              }

              if( curtainParams.Material != null )
              {
                  curtains = curtains.Where(z => z.Material1.ToLower() == curtainParams.Material.ToLower() ||
                                                 z.Material2.ToLower() == curtainParams.Material.ToLower() ||
                                                 z.Material3.ToLower() == curtainParams.Material.ToLower());
              }
           
              return await PagedList<Curtain>.CreateListAsync(curtains, curtainParams.PageNumber, curtainParams.PageSize);
         }    


        public async Task<Curtain> GetCurtain(int id)
             =>await _appDbContext.Curtains.Include(z=>z.PhotoMaterial).FirstOrDefaultAsync(z => z.Id==id);

        public async Task<PhotoMaterial> GetCurtainPhoto(int id)
             =>await _appDbContext.Photos.FirstOrDefaultAsync(z => z.id == id);

        public async Task<IEnumerable<PhotoMaterial>> GetCurtainPhotos(int id)
            =>await _appDbContext.Photos.Where(z => z.CurtainId == id).ToListAsync();
    } 
}