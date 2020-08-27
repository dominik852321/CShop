using System.Collections.Generic;
using System.IO;
using System.Linq;
using Core.Model;
using System.Text.Json;


namespace Infrastructure.Data
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
                    var curtains = JsonSerializer.Deserialize<List<Curtain>>(curtainsData);

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
                    var tableCloths = JsonSerializer.Deserialize<List<TableCloth>>(tableClothsData);

                    foreach (var tableCloth in tableCloths)
                    {
                        _appDbContext.TableCloths.Add(tableCloth);
                    }

                    _appDbContext.SaveChanges();
                }
            }

            
        


    }
}