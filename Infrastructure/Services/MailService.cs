using System;
using System.IO;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Core.Entities.Settings;
using Core.Interface;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Infrastructure.Services
{
    public class MailService: IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async void SendEmail(Order order)
        {  
            string FilePath = Directory.GetCurrentDirectory() + "/Template/ConfirmMail.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[name]", order.ShipToAddress.FirstName)
                               .Replace("[date]", order.OrderDate.DateTime.ToShortDateString())
                               .Replace("[numberOrder]", order.NumberOrder.ToString())
                               .Replace("[price]", order.GetTotal().ToString());

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_mailSettings.DisplayName ,_mailSettings.Mail));
            mailMessage.To.Add(MailboxAddress.Parse(order.ShipToAddress.Email));
            mailMessage.Subject = $"Zamówienie nr {order.NumberOrder}";

            var builder = new BodyBuilder();

            builder.HtmlBody = MailText;
            mailMessage.Body = builder.ToMessageBody();

            try
            {
                using (var smtp = new SmtpClient())
                {
                    smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                    smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
                    await smtp.SendAsync(mailMessage);
                    smtp.Disconnect(true);
                }
            } 
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            };
        }
    }
}