using System.Threading.Tasks;

namespace CurtainShop.API.Data
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