using System;
using Core.Entities.Identity;

namespace API.Dtos
{
    public class OrderToListDto
    {
        public int Id { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public int NumberOrder { get; set; }
        public string Name { get; set; }
        public string DeliveryMethod { get; set; }
        public int Total { get; set; }
        public int ShippingPrice { get; set; }
        
    }
}