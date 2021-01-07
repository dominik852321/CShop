using System;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Interface
{
    public interface IMailService
    {
        void SendEmail(Order order);
    }
}