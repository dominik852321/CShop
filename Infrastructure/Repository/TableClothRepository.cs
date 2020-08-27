using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interface;
using Core.Model;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    public class TableClothRepository : GenericRepository, ITableClothRepository
    {
        private readonly AppDbContext _appDbContext;
        public TableClothRepository(AppDbContext appDbContext): base(appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<PagedList<TableCloth>> GetTableCloths(TableClothParams tableClothParams)
        {
            var tableCloths = _appDbContext.TableCloths.Include(p => p.PhotoMaterial).OrderByDescending(z => z.DateAdded).AsQueryable();

              if(tableClothParams.MinValue!=0 || tableClothParams.MaxValue!=500)
              {
                  tableCloths = tableCloths.Where(z => z.Price >= tableClothParams.MinValue && z.Price <= tableClothParams.MaxValue);
              }

              if(tableClothParams.Type != null )
              {
                  tableCloths = tableCloths.Where(z => z.Type.ToLower() == tableClothParams.Type.ToLower());
              }
              
              return await PagedList<TableCloth>.CreateListAsync(tableCloths, tableClothParams.PageNumber, tableClothParams.PageSize);
        }


        public async Task<TableCloth> GetTableCloth(int id)
            =>await _appDbContext.TableCloths.Include(z=>z.PhotoMaterial).FirstOrDefaultAsync(z => z.Id==id);

         public async Task<PhotoMaterial> GetTableClothPhoto(int id)
             =>await _appDbContext.Photos.FirstOrDefaultAsync(z => z.id == id);

        public async Task<IEnumerable<PhotoMaterial>> GetTableClothPhotos(int id)
            =>await _appDbContext.Photos.Where(z => z.CurtainId == id).ToListAsync();
    }
}