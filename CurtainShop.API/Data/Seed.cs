using System.Collections.Generic;
using System.IO;
using System.Linq;
using CurtainShop.API.Model;
using Newtonsoft.Json;

namespace CurtainShop.API.Data
{
    public class Seed
    {
     
            private readonly AppDbContext _appDbContext;
            public Seed(AppDbContext context)
            {
                _appDbContext = context;
            }

            public void SeedCurtains()
            {
                if (!_appDbContext.Curtains.Any())
                {
                    var curtainsData = File.ReadAllText("Data/CurtainSeedData.json");
                    var curtains = JsonConvert.DeserializeObject<List<Curtain>>(curtainsData);

                    foreach (var curtain in curtains)
                    {
                        _appDbContext.Curtains.Add(curtain);
                    }

                    _appDbContext.SaveChanges();
                }
            }

            public void SeedTableCloths()
            {
                if(!_appDbContext.TableCloths.Any())
                {
                    var tableClothsData = File.ReadAllText("Data/TableClothsSeedData.json");
                    var tableCloths = JsonConvert.DeserializeObject<List<TableCloth>>(tableClothsData);

                    foreach (var tableCloth in tableCloths)
                    {
                        _appDbContext.TableCloths.Add(tableCloth);
                    }

                    _appDbContext.SaveChanges();
                }
            }

            
        


    }
}