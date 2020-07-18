using System.Threading.Tasks;

namespace CurtainShop.API.Data
{
    public interface IGenericRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
    }
}