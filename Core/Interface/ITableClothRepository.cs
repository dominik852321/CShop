using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Specifications;
using Core.Model;


namespace Core.Interface
{
    public interface ITableClothRepository: IGenericRepository
    {
         Task<PagedList<TableCloth>> GetTableCloths(TableClothParams tableClothParams);
         Task<TableCloth> GetTableCloth(int id);
         Task<IEnumerable<PhotoMaterial>> GetTableClothPhotos(int id);
         Task<PhotoMaterial> GetTableClothPhoto(int id);
    }
}