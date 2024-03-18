using BusinessLayer.Abstract;
using MimeKit;
using MailKit.Net.Smtp;

namespace BusinessLayer.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string toAddress, string subject, string body)
        {
            MimeMessage mimeMessage = new MimeMessage();
            MailboxAddress mailboxAddressFrom = new MailboxAddress("TravelWeb Admin", "proje123x@gmail.com");
            MailboxAddress mailboxAddressTo = new MailboxAddress("User", toAddress);

            mimeMessage.From.Add(mailboxAddressFrom);
            mimeMessage.To.Add(mailboxAddressTo);

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = body;
            mimeMessage.Body = bodyBuilder.ToMessageBody();
            mimeMessage.Subject = subject;

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Connect("smtp.gmail.com", 587, false);
                smtpClient.Authenticate("proje123x@gmail.com", "ovhjcdvgywmjmjqr");
                await smtpClient.SendAsync(mimeMessage);
                smtpClient.Disconnect(true);
            }

        }

    }
}
