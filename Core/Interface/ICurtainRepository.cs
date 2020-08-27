using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Specifications;
using Core.Model;

namespace Core.Interface
{
    public interface ICurtainRepository: IGenericRepository
    {
         Task<PagedList<Curtain>> GetCurtains(CurtainParams curtainParams);
         Task<Curtain> GetCurtain(int id);
         Task<IEnumerable<PhotoMaterial>> GetCurtainPhotos(int id);
         Task<PhotoMaterial> GetCurtainPhoto(int id);


    }
}