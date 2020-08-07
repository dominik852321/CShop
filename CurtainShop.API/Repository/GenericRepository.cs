using System.Threading.Tasks;
using CurtainShop.API.Data;
using CurtainShop.API.Interface;

namespace CurtainShop.API.Repository
{
    public class GenericRepository: IGenericRepository
    {
        private readonly AppDbContext _appDbContext;

        public GenericRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }

       public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        public async Task<bool> SaveAll(){
           return await _appDbContext.SaveChangesAsync() > 0;
        }
    }
}