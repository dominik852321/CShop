using System.Threading.Tasks;
using Core.Interface;
using Infrastructure.Data;

namespace Infrastructure.Repository
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