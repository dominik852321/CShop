using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class Seed
    {
      public static async Task SeedAsync(AppDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                
                if (!context.ProductRooms.Any())
                {
                    var roomsData =
                        File.ReadAllText(path + @"/Data/SeedData/rooms.json");

                    var rooms = JsonSerializer.Deserialize<List<ProductRoom>>(roomsData);

                    foreach (var item in rooms)
                    {
                        context.ProductRooms.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData =
                        File.ReadAllText(path + @"/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                
            
               /* if (!context.Products.Any())
                {
                    var productsData =
                        File.ReadAllText(path + @"/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                
                if (!context.ProductPhotos.Any())
                {
                    var productPhotosData =
                       File.ReadAllText(path + @"/Data/SeedData/photos.json");

                    var productPhotos = JsonSerializer.Deserialize<List<ProductPhotos>>(productPhotosData);   

                    foreach (var item in productPhotos)
                    {
                        context.ProductPhotos.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                */
                

                if (!context.DeliveryMethods.Any())
                {
                    var deliveryData =
                        File.ReadAllText(path + @"/Data/SeedData/delivery.json");

                    var delivery = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);

                    foreach (var item in delivery)
                    {
                        context.DeliveryMethods.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                if (!context.Orders.Any())
                {
                    Order order = new Order 
                    {
                        NumberOrder = 1000
                    };
                    
                    context.Orders.Add(order);

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Seed>();
                logger.LogError(ex.Message);
            }
        }
    }
}