using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Interface
{
    public interface IOrderService
    {
         Task<Order> CreateOrderAsync(int deliveryMethod, string basketId, Address shippingAddress);
         Task<IReadOnlyList<Order>> GetOrders();
         Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
         Task<Order> GetOrderByIdAndEmailAsync(int id, string buyerEmail);
         Task<Order> GetOrderByIdAsync(int id);
         Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}