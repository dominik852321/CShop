using System.Collections.Generic;
using System.Threading.Tasks;
using CurtainShop.API.Dtos;
using CurtainShop.API.Model;

namespace CurtainShop.API.Data
{
    public interface ICurtainRepository: IGenericRepository
    {
         Task<IEnumerable<Curtain>> GetCurtains();
         Task<Curtain> GetCurtain(int id);
    }
}