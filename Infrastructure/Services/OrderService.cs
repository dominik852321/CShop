using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interface;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        public readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductRepository _productRepository;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IProductRepository productRepository)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
            _productRepository = productRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // Get all items from basket
             var basket = await _basketRepo.GetBasketAsync(basketId);

             var items = new List<OrderItem>();
             foreach(var item in basket.Items)
             {
                 var productItem = await _productRepository.GetProductByIdAsync(item.Id);
                
                 var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                 var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                 items.Add(orderItem);
             }
             // Get Delivery method from repo
             var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

             // calc subtotal
             var subtotal = items.Sum(item => item.Price * item.Quantity);

             // create order
             var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
             
             // Save to db  
             _unitOfWork.Repository<Order>().Add(order);

             var result = await _unitOfWork.Complete();

             if(result <= 0) return null;

             // delete basket
             await _basketRepo.DeleteBasketAsync(basketId);
             
             // return order
             return order; 
             
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }
    }
}