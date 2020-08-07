using System.Collections.Generic;
using System.Threading.Tasks;
using CurtainShop.API.Helpers;
using CurtainShop.API.Model;

namespace CurtainShop.API.Interface
{
    public interface ITableClothRepository: IGenericRepository
    {
         Task<PagedList<TableCloth>> GetTableCloths(TableClothParams tableClothParams);
         Task<TableCloth> GetTableCloth(int id);
         Task<IEnumerable<PhotoMaterial>> GetTableClothPhotos(int id);
         Task<PhotoMaterial> GetTableClothPhoto(int id);
    }
}