using System.Collections.Generic;
using System.Threading.Tasks;
using CurtainShop.API.Dtos;
using CurtainShop.API.Helpers;
using CurtainShop.API.Model;

namespace CurtainShop.API.Data
{
    public interface ICurtainRepository: IGenericRepository
    {
         Task<PagedList<Curtain>> GetCurtains(CurtainParams curtainParams);
         Task<Curtain> GetCurtain(int id);
         Task<IEnumerable<PhotoMaterial>> GetPhotoMaterials(int id);
         Task<PhotoMaterial> GetPhotoMaterial(int id);


    }
}