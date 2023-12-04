using DataAccsessLayer.Concrete;
using DTOLayer.Dtos.AppUserDtos;
using DTOLayer.Dtos.ContactUserDtos;
using Entity;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Drawing.Text;

namespace TrawelWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SendMessage(ContactUserDto contactUserDto)
        {

            if (ModelState.IsValid)
            {
                ContactUser contact = new ContactUser()
                {
                    FirstName = contactUserDto.FirstName,
                    LastName = contactUserDto.LastName,
                    Email = contactUserDto.Email,
                    Message = contactUserDto.Message,
                    Subject = contactUserDto.Subject
                };
                _context.Add(contact);
                _context.SaveChanges();

            }
            return View();
        }
    }
}
